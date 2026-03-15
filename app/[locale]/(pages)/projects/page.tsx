export const dynamic = "force-dynamic";

import { ProjectFindManyArgs } from "@/app/generated/prisma/models";
import { ENV } from "@/lib/env";
import prisma, { prismaConfig } from "@/lib/prisma";
import ProjectsTable from "@/sections/projects/projects-table";

export default async function Projects() {
  const projects = await prisma.project.findMany(prismaConfig as ProjectFindManyArgs);

  return <ProjectsTable projects={projects.map((project) => ({ ...project, image: project.image }))} projectsHost={ENV.projectsHost!} projectsSource={ENV.projectsSource!} />;
}
