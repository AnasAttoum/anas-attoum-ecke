"use client";

import { Skill } from "@/app/generated/prisma/browser";
import ToAnimation from "@/components/gsap/to-animation";
import { bulkChildrenAnimation } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import Skills from "./skills";
import Code from "@/components/code/code";
import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToggleEnableDialog from "@/components/dialogs/toggle-enable-dialog";
import AddSkill from "@/components/dialogs/skill/add-skill";
import DeleteDialog from "@/components/dialogs/delete-dialog";

export default function SkillsTab({ skills }: { skills: Skill[] }) {

    const t = useTranslations();
    const [confirmed, setConfirmed] = useState(false);
    const [skill, setSkill] = useState<Skill | boolean>(false);
    const [editedSkills, setEditedSkills] = useState(skills);
    const enabledSkills = editedSkills.filter(({ enabled }) => enabled);

    return (
        <section className="flex flex-col gap-5">

            <AddSkill skill={skill} setSkill={setSkill} skillsLength={skills.length} />

            <div className="flex flex-col gap-3 text-black mb-5">
                {skills.map((skill, index) => {
                    const { id, name, image, color, enabled } = skill;
                    return (
                        <ToAnimation
                            key={id}
                            to={index % 2 === 0 ? "left" : "right"}
                            order={bulkChildrenAnimation(index)}
                        >
                            <div
                                className={cn(
                                    "relative shadow dark:shadow-dark rounded-md bg-light p-5 px-10 grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-4 gap-5",
                                    !enabled && "bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,var(--secondary)_10px,var(--secondary)_20px)]",
                                    confirmed && "grayscale cursor-not-allowed"
                                )}
                            >
                                <div className="absolute top-0 -left-4 flex items-center h-full">
                                    <div className="bg-primary p-3 text-white rounded-md">{index + 1}.</div>
                                </div>

                                <strong>{name}</strong>

                                <div className="relative">
                                    <Image src={image} alt={name} fill className="object-contain" />
                                </div>

                                <div className="flex gap-1">
                                    <div className="h-full aspect-square rounded-md" style={{ backgroundColor: color }} />
                                    {color}
                                </div>

                                <div className="flex justify-center items-center gap-2">
                                    <ToggleEnableDialog item={skill} />
                                    <DeleteDialog item={skill} />
                                </div>
                            </div>
                        </ToAnimation>
                    )
                })}
            </div>

            {confirmed &&
                <div className="pb-5 bg-primary/50 rounded-md">
                    <Skills skills={enabledSkills} />
                    <div className="flex flex-nowrap gap-1 md:gap-3 p-2 md:p-3">
                        <ToAnimation to="right" className="flex-1 min-w-0" >
                            <Code src={skills} title="before" />
                        </ToAnimation>
                        <ToAnimation to="left" className="flex-1 min-w-0" >
                            <Code src={editedSkills} title="after" />
                        </ToAnimation>
                    </div>
                </div>
            }

            <div>
                {!confirmed
                    ? <ToAnimation to="top">
                        <button onClick={() => setConfirmed(true)} className="secondaryBtn">{t("next")}</button>
                    </ToAnimation>
                    :
                    <ToAnimation to="top">
                        <SubmitButton onClick={() => setConfirmed(false)} />
                    </ToAnimation>
                }
            </div>
        </section>
    )
}
