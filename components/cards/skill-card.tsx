import Image from "next/image"
import ToAnimation from "../gsap/to-animation"
import { skillsHost } from "@/lib/images-hosts"
import { Skill } from "@/app/generated/prisma/client"
import { bulkChildrenAnimation } from "@/lib/animation"

type Props = {
    skill: Skill;
    index: number;
}

export default function SkillCard({ skill, index }: Props) {
    const { name, color, image } = skill;
    return (
        <ToAnimation to="none"
            order={bulkChildrenAnimation(index)}
        >
            <div tabIndex={0} className="relative flex justify-center items-center transition w-37 h-37 shadow-lg dark:shadow-black bg-white dark:bg-gray rounded-[50%] hover:rounded-lg focus:rounded-lg group">
                <Image src={skillsHost + image} alt={name} width={100} height={100} className="group-hover:-translate-y-12 group-focus-within:-translate-y-12 transition" />
                <h4
                    className="h4 absolute place-content-center -z-10 opacity-0 group-hover:translate-y-8 group-focus-within:translate-y-8 group-hover:z-10 group-focus-within:z-10 group-hover:opacity-100 group-focus-within:opacity-100 font-medium transition"
                    style={{ color }}
                >
                    {name}
                </h4>
            </div>
        </ToAnimation>
    )
}