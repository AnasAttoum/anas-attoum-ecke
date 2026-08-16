import Logo from "@/components/logo/logo";
import Image from "next/image";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-dvh">
            <div className='h-15'>
                <Logo />
            </div>
            <Image
                src="/icons/more/three-dots-loading-primary.svg"
                alt="..."
                width={50}
                height={50}
            />
        </div>
    )
}
