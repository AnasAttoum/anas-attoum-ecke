import { SocialMedia } from "@/app/generated/prisma/browser";
import clsx from "clsx";
import { ClassValue } from "clsx";
import Image from "next/image";

export default function SocialLinks({ links, socialsHost, className }: { links: SocialMedia[]; socialsHost: string; className?: ClassValue }) {

    return (
        <div className={clsx("flex flex-wrap justify-center items-center mt-15 gap-5", className)}>
            {links.map(({ alt, href, image }) => (
                <a
                    key={alt}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="socialBtn"
                >
                    <Image
                        src={socialsHost + image}
                        alt={alt}
                        unoptimized
                        width={30}
                        height={30}
                    />
                </a>
            ))}
        </div>
    )
}
