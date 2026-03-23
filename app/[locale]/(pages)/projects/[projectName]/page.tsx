import { type Project } from "@/app/generated/prisma/client";
import { ProjectFindFirstArgs } from "@/app/generated/prisma/models";
import LetterAnimation from "@/components/gsap/letter-animation";
import prisma, { prismaConfigFindProject } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import Square from '@/components/icons/square';
import ToAnimation from "@/components/gsap/to-animation";
import { localesType } from "@/lib/localization/routing";
import { bulkChildrenAnimation } from "@/lib/animation";
import { Link } from "@/lib/localization/navigation";
import { paths } from "@/lib/paths";
import { ENV } from "@/lib/env";

export default async function Project({ params }: { params: Promise<{ locale: string; projectName: string }> }) {

    const { locale, projectName } = await params;
    const project: Project | null = await prisma.project.findFirst(prismaConfigFindProject(projectName) as ProjectFindFirstArgs);
    if (!project) notFound()

    const t = await getTranslations();

    const { name, code, demo, mockup, technologies, logo, video } = project;

    return (
        <section className="mt-28!">

            <LetterAnimation title={name} className="text-primary mt-0 mb-8" withoutTranslate />

            <div className="flex justify-center items-center gap-5">
                <Square className="rotateLeft" />
                <LetterAnimation title="overview" className="my-0!" />
                <Square className="rotateRight" />
            </div>


            <div className="fixed bottom-0 md:top-0 right-0 z-20 flex items-center max-md:w-full md:h-full md:pr-2">
                <div className="flex max-md:py-4 max-md:w-full flex-row-reverse md:flex-col justify-evenly md:justify-center gap-5 dark:shadow-black bg-background backdrop-blur-xs max-md:shadow-xl dark:max-md:shadow-black">
                    {/* <Back /> */}

                    <Link
                        href={paths.projects}
                        className="flex flex-col simpleBtnFocus items-center gap-1 font-semibold text-primary hover:text-secondary rounded-lg!"
                    >
                        <Image
                            src="/icons/more/app-dots.svg"
                            alt="code"
                            width={20}
                            height={20}
                        />
                        {t("other")}
                    </Link>

                    {code && <a
                        href={code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col simpleBtnFocus items-center gap-1 font-semibold text-primary hover:text-secondary rounded-lg!"
                    >
                        <Image
                            src="/icons/more/code.svg"
                            alt="code"
                            width={20}
                            height={20}
                        />
                        {t("code")}
                    </a>}
                    {demo && <a
                        href={demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col simpleBtnFocus items-center gap-1 font-semibold text-primary hover:text-secondary rounded-lg!"
                    >
                        <Image
                            src="/icons/more/demo.svg"
                            alt="demo"
                            width={20}
                            height={20}
                        />
                        {t("demo")}
                    </a>}
                </div>
            </div>

            {/* mockup */}
            <ToAnimation to="none" className="relative h-[60vw] md:h-[50vw] lg:h-[30vw]">
                <Image
                    src={ENV.projectsHost + mockup}
                    alt={name + " mockup"}
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </ToAnimation>

            <div className="flex flex-col gap-16">
                {/* technologies */}
                <div className="flex justify-center flex-wrap gap-3 pr-5">
                    {technologies.map((technology, i) =>
                        <ToAnimation key={technology} to="none" order={bulkChildrenAnimation(i)}>
                            <h4 tabIndex={0} className="h4 chip transition">{technology}</h4>
                        </ToAnimation>
                    )}
                </div>

                {/* projects details */}
                <div className="grid grid-cols-2 items-stretch gap-16">
                    <ToAnimation to="bottom" className="relative flex items-center col-span-2 md:col-span-1 max-md:h-65">
                        <Image
                            src={ENV.projectsHost + logo}
                            alt={name}
                            fill
                            className="object-contain"
                        />
                    </ToAnimation>

                    <ToAnimation to="top" order={2} className="col-span-2 md:col-span-1 ">
                        <h4 className="h4 border-primary border-dashed border-2 px-5 py-10 text-gray" dangerouslySetInnerHTML={{ __html: project?.[`description_${locale as localesType}`] }}></h4>
                    </ToAnimation>
                </div>

                {/* video */}
                <ToAnimation>
                    <iframe src={video} width="100%" height="480" title={name} allowFullScreen style={{ maxWidth: '100%', height: 'auto', aspectRatio: '480/229' }}></iframe>
                </ToAnimation>
            </div>
        </section>
    )
}
