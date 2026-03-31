import { SocialMedia } from "@/app/generated/prisma/browser";
import clsx from "clsx";
import { ClassValue } from "clsx";
import Image from "next/image";

export default function SocialLinks({ links, socialsHost, className }: { links: SocialMedia[]; socialsHost: string; className?: ClassValue }) {
    console.log('links: ', links);
    return (
        <div className={clsx("flex justify-center items-center gap-5", className)}>
            {links.map(({ alt, href, image }) => (
                <a
                    key={alt}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block simpleBtnFocus bg-light hover:bg-gray! shadow-md transition"
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
