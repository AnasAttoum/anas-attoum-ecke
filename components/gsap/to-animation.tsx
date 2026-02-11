"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClassValue } from "clsx";
import clsx from "clsx";
import { animationSpeed } from "@/lib/animation";

type Props = {
    children: ReactNode;
    order?: number;
    to?: "right" | "left" | "top" | "bottom" | "none";
    className?: ClassValue;
};

gsap.registerPlugin(ScrollTrigger);

export default function ToAnimation({ children, order = 1, to = "right", className }: Props) {
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const fromX = to === "right"
            ? -100
            : to === "left"
                ? 100
                : 0;
        const fromY = to === "bottom"
            ? -100
            : to === "top"
                ? 100
                : 0;
        const fromScale = to === "none" ? .7 : 1;

        gsap.set(ref.current, { transition: "none" });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 90%",
                    end: "bottom 10%",
                    // toggleActions: "play none none reverse",
                    // markers: true
                },
            });

            tl.fromTo(
                ref.current,
                { x: fromX, y: fromY, opacity: 0, scale: fromScale, immediateRender: false },
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "none",
                },
                animationSpeed + (order - 1) * animationSpeed
            );
        }, ref);
        return () => ctx.revert();
    }, [order, to]);

    return <div ref={ref} className={clsx("opacity-0", className)}>{children}</div>;
}