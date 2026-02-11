import Image from "next/image";

type Props = {
    src: string;
}

export default function Photo({ src }: Props) {
    return (
        <div
            tabIndex={0}
            className="relative m-5 group"
        >
            <Image
                src={src}
                alt="Anas Attoum’s picture"
                width={330}
                height={330}
                className="rounded-3xl border-8 border-secondary transition
                   group-hover:scale-105
                   group-focus:scale-105
                   group-hover:rotate-3
                   group-focus:rotate-3"
            />
            <span className="second-border" />
        </div>
    )
}