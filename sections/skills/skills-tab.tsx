"use client";

import { Skill } from "@/app/generated/prisma/browser";
import ToAnimation from "@/components/gsap/to-animation";
import { bulkChildrenAnimation } from "@/lib/animation";
import { cn } from "@/lib/utils";
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

export default function SkillsTab({ skills, skillsHost }: { skills: Skill[]; skillsHost: string }) {

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
                body: JSON.stringify(editedSkills),
            });

            await checkIfResIsOk(t, res, router);

            setConfirmed(false);
        } catch (error) {
            catchError(t, error)
        } finally {
            setLoading(false);
        }
    }


    return (
        <section className="flex flex-col gap-5">

            <AddSkill skill={skill} setSkill={setSkill} skillsLength={skills.length} skillsHost={skillsHost} />

            <DragDropProvider
                onDragEnd={(event) => {
                    setEditedSkills((items) => move(items, event));
                    setCreateNewOrder(true);
                }}
            >
                <div className="flex flex-col gap-5 text-black mb-5">
                    {skills.map((skill, index) =>
                        <SkillItem
                            key={skill.id}
                            skill={skill}
                            index={index}
                            confirmed={confirmed}
                            setSkill={setSkill}
                            orderChanged={skill.id !== editedSkills?.[index]?.id}
                            skillsHost={skillsHost}
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
                    <ToAnimation to="top">
                        <SubmitButton onClick={submit} loading={loading} />
                    </ToAnimation>
                }
            </div>
        </section>
    )
}

export function SkillItem(
    { skill, index, confirmed, setSkill, orderChanged, skillsHost }: {
        skill: Skill;
        index: number;
        confirmed: boolean;
        setSkill: Dispatch<SetStateAction<boolean | Skill>>;
        orderChanged: boolean;
        skillsHost: string;
    }) {
    const { id, name, order, image, color, enabled } = skill;

    const [element, setElement] = useState<Element | null>(null);
    const handleRef = useRef<HTMLDivElement | null>(null);
    const { isDragging, } = useSortable({ id, index, element, handle: handleRef });

    return (
        <div
            ref={setElement}
            data-shadow={isDragging || undefined}
            className={cn(
                confirmed && "grayscale pointer-events-none",
            )}
        >
            <ToAnimation
                to={index % 2 === 0 ? "left" : "right"}
                order={bulkChildrenAnimation(index)}
            >
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
            </ToAnimation>
        </div>
    )
}