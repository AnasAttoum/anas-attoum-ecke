import { SkillFindManyArgs } from "@/app/generated/prisma/models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { skillsHost } from "@/lib/images-hosts";
import prisma, { prismaConfig } from "@/lib/prisma";
import SkillsTab from "@/sections/skills-tab";
import { getTranslations } from "next-intl/server";

export default async function Dashboard() {

  const t = await getTranslations();
  const skills = await prisma.skill.findMany(prismaConfig as SkillFindManyArgs);

  return (
    <section>
      <Tabs defaultValue="skills">
        <TabsList>
          <TabsTrigger value="projects">{t("projects")}</TabsTrigger>
          <TabsTrigger value="skills">{t("skills")}</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">Make changes to your projects here.</TabsContent>
        <TabsContent value="skills">
          <SkillsTab skills={skills.map((skill) => ({ ...skill, image: skillsHost + skill.image }))} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
