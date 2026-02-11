import { Project } from "@/app/generated/prisma/client"
import ToAnimation from "../gsap/to-animation";
import { Link } from "@/lib/localization/navigation";
import Image from "next/image";
import { paths } from "@/lib/paths";
import { bulkChildrenAnimation } from "@/lib/animation";
import { useTranslations } from "next-intl";

type Props = {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: Props) {
    const { name, image, technologies } = project;
    const t = useTranslations();

    return (
        <ToAnimation className="col-span-2 md:col-span-1" to={index % 2 === 0 ? "bottom" : "top"}
            order={bulkChildrenAnimation(index)}
        >
            <div tabIndex={0} className="relative w-full min-h-40 aspect-2/1 rounded-md overflow-hidden transition group text-white shadow-lg dark:shadow-black">
                <Image
                    src={image}
                    alt={name}
                    fill
                    unoptimized
                />

                {/* blur effect */}
                <div className="absolute inset-0 group-hover:backdrop-blur-sm group-focus-within:backdrop-blur-sm transition">
                    <div className="absolute top-0 w-[50%] h-0 opacity-0 bg-gray/20 group-hover:h-full group-focus-within:h-full group-hover:opacity-100 group-focus-within:opacity-100 transition" />
                    <div className="absolute bottom-0 right-0 w-[50%] h-0 opacity-0 bg-gray/20 group-hover:h-full group-focus-within:h-full group-hover:opacity-100 group-focus-within:opacity-100 transition" />
                </div>

                <h3 className="h3 relative font-semibold text-center z-10 -top-3 group-hover:top-3 group-focus-within:top-3 group-hover:md:top-7 group-focus-within:md:top-7 group-hover:lg:top-9 group-focus-within:lg:top-9 xl:top-10 tracking-widest opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition">
                    {name}
                </h3>
                <div className="relative flex justify-center items-center w-full h-full -mt-10 -z-10 group-hover:z-10 group-focus-within:z-10">
                    <Link href={`${paths.projects}/${name.toLowerCase().replaceAll(" ", "-")}`} className="primaryBtn py-1! lg:py-3! mt-5! opacity-0! group-hover:opacity-100! group-focus-within:opacity-100! right-10 group-hover:right-0 group-focus-within:right-0 transition">{t("more-details")}</Link>
                </div>
                <div className="text-xs lg:text-sm absolute text-center! line-clamp-1 z-10 -bottom-3 group-hover:bottom-6 group-focus-within:bottom-6 group-hover:md:bottom-8 group-focus-within:md:bottom-8 group-hover:lg:bottom-9 group-focus-within:lg:bottom-9 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 px-3 w-full transition">{technologies.join(" | ")}</div>
            </div>
        </ToAnimation>
    )
}