import { ProjectFindManyArgs } from "@/app/generated/prisma/models";
import ProjectCard from "@/components/cards/project-card";
import LetterAnimation from "@/components/gsap/letter-animation";
import ToAnimation from "@/components/gsap/to-animation";
import { projectsHost } from "@/lib/images-hosts";
import { Link } from "@/lib/localization/navigation";
import { paths } from "@/lib/paths";
import prisma, { prismaConfig } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";

export default async function Projects() {

    const projects = await prisma.project.findMany({ ...prismaConfig as ProjectFindManyArgs, take: 4 });
    const t = await getTranslations();

    return (
        <section>
            <LetterAnimation title="did" />

            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-10 max-md:space-y-7">

                {projects
                    .map((el) => ({ ...el, image: projectsHost + el.image }))
                    .map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}


            </div>
            <div className="grid grid-cols-3 w-full md:gap-3">
                <div className="col-span-3 md:col-span-2 mt-8 md:mt-16">
                    <ToAnimation to="top">
                        <Link href={paths.projects} className="secondaryBtn">{t("more-projects")}</Link>
                    </ToAnimation>
                </div>
                <div className="col-span-3 md:col-span-1 mt-8 md:mt-16">
                    <ToAnimation to="bottom" order={2}>
                        <Link href={paths.contact} className="basicBtn">{t("contact")}</Link>
                    </ToAnimation>
                </div>
            </div>

        </section>
    )
}
