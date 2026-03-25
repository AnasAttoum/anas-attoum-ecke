export const dynamic = "force-dynamic";

import { SkillFindManyArgs } from "@/app/generated/prisma/models";
import { ENV } from "@/lib/env";
import prisma, { prismaConfig } from "@/lib/prisma";
import SkillsTable from "@/sections/skills/skills-table";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("skills"),
  };
}

export default async function Skills() {
  const skills = await prisma.skill.findMany(prismaConfig as SkillFindManyArgs);

  return <SkillsTable skills={skills.map((skill) => ({ ...skill, image: skill.image }))} skillsHost={ENV.skillsHost!} skillsSource={ENV.skillsSource!} />;
}
