import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTranslations } from "next-intl/server";

export default async function Dashboard() {

  const t = await getTranslations();

  return (
    <section>
      <Tabs defaultValue="skills">
        <TabsList>
          <TabsTrigger value="projects">{t("projects")}</TabsTrigger>
          <TabsTrigger value="skills">{t("skills")}</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">projects</TabsContent>
        <TabsContent value="skills">
          skills
        </TabsContent>
      </Tabs>
    </section>
  );
}
