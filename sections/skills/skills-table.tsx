"use client";

import { Skill } from "@/app/generated/prisma/browser";
import ToAnimation, { ToAnimationWrapper } from "@/components/gsap/to-animation";
import { cn, detectChanges } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToggleEnableDialog from "@/components/dialogs/toggle-enable-dialog";
import AddSkill from "@/components/dialogs/skill/add-skill";
import DeleteDialog from "@/components/dialogs/delete-dialog";
import EditButton from "@/components/buttons/edit/edit";
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import { useRouter } from "@/lib/localization/navigation";
import { catchError, checkIfResIsOk } from "@/lib/errors";
import Skills from "./skills";

export default function SkillsTable({ skills, skillsHost, skillsSource }: { skills: Skill[]; skillsHost: string; skillsSource: string }) {

    const t = useTranslations();
    const router = useRouter();

    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createNewOrder, setCreateNewOrder] = useState(false);
    const [skill, setSkill] = useState<Skill | boolean>(false);
    const [editedSkills, setEditedSkills] = useState(skills);
    const enabledSkills = editedSkills.filter(({ enabled }) => enabled);

    useEffect(() => {
        setEditedSkills(skills)
    }, [skills, setEditedSkills])

    const submit = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/skills/edit-orders`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(detectChanges(skills, editedSkills)),
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
        setEditedSkills(skills);

        setCreateNewOrder(false);
        setConfirmed(false);
    };


    return (
        <section className="flex flex-col gap-5">

            <AddSkill skill={skill} setSkill={setSkill} skillsLength={skills.length} enabledLength={enabledSkills.length} skillsHost={skillsHost} skillsSource={skillsSource} />

            <DragDropProvider
                onDragEnd={(event) => {
                    setEditedSkills((items) => {
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
                    {editedSkills.map((skill, index) =>
                        <SkillItem
                            key={skill.id}
                            skill={skill}
                            index={index}
                            confirmed={confirmed}
                            setSkill={setSkill}
                            orderChanged={skill.id !== skills?.[index]?.id}
                            skillsHost={skillsHost}
                            createNewOrder={createNewOrder}
                        />
                    )}
                </div>
            </DragDropProvider>

            {confirmed &&
                <div className="pb-5 bg-primary/50 rounded-md">
                    <Skills skills={enabledSkills} skillsHost={skillsHost} />
                    {/* <div className="flex flex-nowrap gap-1 md:gap-3 p-2 md:p-3">
                        <ToAnimation to="right" className="flex-1 min-w-0" >
                            <Code src={skills} title="before" />
                        </ToAnimation>
                        <ToAnimation to="left" className="flex-1 min-w-0" >
                            <Code src={editedSkills} title="after" />
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

export function SkillItem(
    { skill, index, confirmed, setSkill, orderChanged, skillsHost, createNewOrder }: {
        skill: Skill;
        index: number;
        confirmed: boolean;
        setSkill: Dispatch<SetStateAction<boolean | Skill>>;
        orderChanged: boolean;
        skillsHost: string;
        createNewOrder: boolean;
    }) {
    const { id, name, order, image, color, enabled } = skill;

    const [element, setElement] = useState<Element | null>(null);
    const handleRef = useRef<HTMLDivElement | null>(null);
    const { isDragging } = useSortable({ id, index, element, handle: handleRef });

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

                    <div className="relative">
                        <Image src={skillsHost + image} alt={name} fill className="object-contain" />
                    </div>

                    <div className="flex gap-1">
                        <div className="h-full aspect-square rounded-md" style={{ backgroundColor: color }} />
                        {color}
                    </div>

                    <div className="flex justify-center items-center gap-2">
                        <ToggleEnableDialog item={skill} skillsHost={skillsHost} />
                        <EditButton openDialog={() => setSkill(skill)} />
                        <DeleteDialog item={skill} skillsHost={skillsHost} />
                    </div>
                </div>
            </ToAnimationWrapper>
        </div>
    )
}