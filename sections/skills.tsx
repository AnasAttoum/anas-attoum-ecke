import { SkillFindManyArgs } from "@/app/generated/prisma/models";
import SkillCard from "@/components/cards/skill-card";
import LetterAnimation from "@/components/gsap/letter-animation";
import prisma, { prismaConfig } from "@/lib/prisma";

export default async function Skills() {

    const skills = await prisma.skill.findMany(prismaConfig as SkillFindManyArgs);

    return (
        <div>
            <section>
                <LetterAnimation title="love" />

                <div className="flex justify-center flex-wrap gap-2 sm:gap-3 md:gap-10 max-md:space-y-7">

                    {skills.map((skill, index) =>
                        <SkillCard key={skill.id} skill={skill} index={index} />
                    )}

                </div>

            </section>
        </div>
    )
}
