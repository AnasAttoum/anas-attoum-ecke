"use client";

import Image from "next/image";
import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

export default function PhotoViewer({ src, alt, className }: { src: string; alt: string; className?: ClassValue }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div
                className={cn(
                    "relative w-full h-full min-h-6",
                    !open && "cursor-zoom-in",
                    className
                )}
                onClick={() => setOpen(true)}
            >
                <Image src={src} alt={alt} fill unoptimized className={cn("object-contain")} />
            </div>

            {open && createPortal(
                <div
                    className="fixed inset-0 z-9999 bg-black/90 flex items-center justify-center p-5"
                    onClick={() => setOpen(false)}
                >
                    {/* <button
                        className="absolute top-6 right-6 text-white"
                        onClick={() => setOpen(false)}
                    >
                        <X size={32} />
                    </button> */}

                    <div
                        className="relative w-full h-full max-w-6xl max-h-[90vh]"
                    >
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            unoptimized
                            className="object-contain"
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}