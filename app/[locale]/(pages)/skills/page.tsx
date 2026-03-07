export const dynamic = "force-dynamic";

import { SkillFindManyArgs } from "@/app/generated/prisma/models";
import { ENV } from "@/lib/env";
import prisma, { prismaConfig } from "@/lib/prisma";
import SkillsTab from "@/sections/skills/skills-tab";

export default async function Skills() {
  const skills = await prisma.skill.findMany(prismaConfig as SkillFindManyArgs);

  return <SkillsTab skills={skills.map((skill) => ({ ...skill, image: skill.image }))} skillsHost={ENV.skillsHost!} skillsSource={ENV.skillsSource!} />;
}
