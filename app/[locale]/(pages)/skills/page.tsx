import { SkillFindManyArgs } from "@/app/generated/prisma/models";
import { skillsHost } from "@/lib/images-hosts";
import prisma, { prismaConfig } from "@/lib/prisma";
import SkillsTab from "@/sections/skills/skills-tab";

export default async function Skills() {
  const skills = await prisma.skill.findMany(prismaConfig as SkillFindManyArgs);

  return <SkillsTab skills={skills.map((skill) => ({ ...skill, image: skill.image }))} skillsHost={skillsHost!} />;
}
