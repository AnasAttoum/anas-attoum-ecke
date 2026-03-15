import { Project } from "@/app/generated/prisma/browser"
import ProjectCard from "@/components/cards/project-card";

type Props = {
    projects: Project[];
    projectsHost: string;
}

export default function Projects({ projects, projectsHost }: Props) {
    return (
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-10 max-md:space-y-7">
            {projects.map((project, index) => (
                <ProjectCard key={project.id} project={{ ...project, image: projectsHost + project.image }} index={index} />
            ))}
        </div>
    )
}