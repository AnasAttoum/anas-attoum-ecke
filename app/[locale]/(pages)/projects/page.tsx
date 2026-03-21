export const dynamic = "force-dynamic";

import { ProjectFindManyArgs } from "@/app/generated/prisma/models";
import { ENV } from "@/lib/env";
import prisma, { prismaConfig } from "@/lib/prisma";
import ProjectsTable from "@/sections/projects/projects-table";

export default async function Projects({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const search = await searchParams;
  const { type } = search;

  const projects = await prisma.project.findMany(prismaConfig as ProjectFindManyArgs);
  const allTechnologies = projects.flatMap(p => p.technologies);
  const uniqueTechnologies = Array.from(new Set(allTechnologies));

  return <ProjectsTable projects={projects.map((project) => ({ ...project, image: project.image }))} projectsHost={ENV.projectsHost!} projectsSource={ENV.projectsSource!} initialType={type} uniqueTechnologies={uniqueTechnologies} />;
}
