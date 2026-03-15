"use client";

import ToAnimation, { ToAnimationWrapper } from "@/components/gsap/to-animation";
import { cn, detectChanges } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToggleEnableDialog from "@/components/dialogs/toggle-enable-dialog";
import DeleteDialog from "@/components/dialogs/delete-dialog";
import EditButton from "@/components/buttons/edit/edit";
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import { useRouter } from "@/lib/localization/navigation";
import { catchError, checkIfResIsOk } from "@/lib/errors";
import { Project } from "@/app/generated/prisma/browser";
import Projects from "./projects";
import PhotoViewer from "@/components/photo/photo-viewer";

export default function ProjectsTable({ projects, projectsHost, projectsSource }: { projects: Project[]; projectsHost: string; projectsSource: string }) {
    const t = useTranslations();
    const router = useRouter();

    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createNewOrder, setCreateNewOrder] = useState(false);
    const [project, setproject] = useState<Project | boolean>(false);
    const [editedprojects, setEditedprojects] = useState(projects);
    const enabledprojects = editedprojects.filter(({ enabled }) => enabled);

    useEffect(() => {
        setEditedprojects(projects)
    }, [projects, setEditedprojects])

    const submit = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/projects/edit-orders`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(detectChanges(projects, editedprojects)),
            });

            await checkIfResIsOk(t, res, router);

            setConfirmed(false);
        } catch (error) {
            catchError(t, error)
        } finally {
            setLoading(false);
        }
    }

    const resetOrder = () => {
        setEditedprojects(projects);

        setCreateNewOrder(false);
        setConfirmed(false);
    };


    return (
        <section className="flex flex-col gap-5">

            {/* <Addproject project={project} setproject={setproject} projectsLength={projects.length} enabledLength={enabledprojects.length} projectsHost={projectsHost} projectsSource={projectsSource} /> */}

            <DragDropProvider
                onDragEnd={(event) => {
                    setEditedprojects((items) => {
                        setCreateNewOrder(true);

                        const newItems = move(items, event);

                        return newItems.map((item, index) => ({
                            ...item,
                            order: newItems.length - index,
                        }));
                    });
                }}
            >
                <div className="flex flex-col gap-5 text-black mb-5">
                    {editedprojects.map((project, index) =>
                        <ProjectItem
                            key={project.id}
                            project={project}
                            index={index}
                            confirmed={confirmed}
                            setproject={setproject}
                            orderChanged={project.id !== projects?.[index]?.id}
                            projectsHost={projectsHost}
                            createNewOrder={createNewOrder}
                        />
                    )}
                </div>
            </DragDropProvider>

            {confirmed &&
                <div className="pb-5 bg-primary/50 rounded-md">
                    <Projects projects={enabledprojects} projectsHost={projectsHost} />
                    {/* <div className="flex flex-nowrap gap-1 md:gap-3 p-2 md:p-3">
                        <ToAnimation to="right" className="flex-1 min-w-0" >
                            <Code src={projects} title="before" />
                        </ToAnimation>
                        <ToAnimation to="left" className="flex-1 min-w-0" >
                            <Code src={editedprojects} title="after" />
                        </ToAnimation>
                    </div> */}
                </div>
            }

            <div>
                {!confirmed
                    ? createNewOrder
                        ? <ToAnimation to="top">
                            <button onClick={() => setConfirmed(true)} className="secondaryBtn">{t("next")}</button>
                        </ToAnimation>
                        : null
                    :
                    <div className="flex gap-5">
                        <ToAnimation to="top" className="flex-2">
                            <SubmitButton onClick={submit} loading={loading} />
                        </ToAnimation>
                        <ToAnimation to="bottom" className="flex-1">
                            <button onClick={resetOrder} className="secondaryBtn">{t("reset")}</button>
                        </ToAnimation>
                    </div>
                }
            </div>
        </section>
    )
}

export function ProjectItem(
    { project, index, confirmed, setproject, orderChanged, projectsHost, createNewOrder }: {
        project: Project;
        index: number;
        confirmed: boolean;
        setproject: Dispatch<SetStateAction<boolean | Project>>;
        orderChanged: boolean;
        projectsHost: string;
        createNewOrder: boolean;
    }) {
    const { id, name, order, image, type, enabled } = project;

    const [element, setElement] = useState<Element | null>(null);
    const handleRef = useRef<HTMLDivElement | null>(null);
    const { isDragging } = useSortable({ id, index, element, handle: handleRef });
    const t = useTranslations();

    return (
        <div
            ref={setElement}
            data-shadow={isDragging || undefined}
            className={cn(
                confirmed && "grayscale pointer-events-none",
            )}
        >
            <ToAnimationWrapper preventAnimation={orderChanged || createNewOrder} index={index}>
                <div
                    className={cn(
                        "relative shadow dark:shadow-dark rounded-md bg-light p-5 px-10 grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-4 gap-5",
                        !enabled && "bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,var(--secondary)_10px,var(--secondary)_20px)]",
                        orderChanged && "border-4 border-primary"
                    )}
                >
                    <div ref={handleRef} className="absolute top-0 -left-4 flex items-center h-full cursor-grab">
                        <div className="bg-primary p-3 text-white rounded-md">{order}.</div>
                    </div>

                    <strong>{name}</strong>

                    <PhotoViewer src={projectsHost + image} alt={name} />

                    {t(type)}

                    <div className="flex justify-center items-center gap-2">
                        {/* <ToggleEnableDialog item={project} projectsHost={projectsHost} />
                            <EditButton openDialog={() => setproject(project)} />
                            <DeleteDialog item={project} projectsHost={projectsHost} /> */}
                    </div>
                </div>
            </ToAnimationWrapper>
        </div>
    )
}