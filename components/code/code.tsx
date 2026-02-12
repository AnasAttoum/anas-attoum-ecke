"use client";

import dynamic from "next/dynamic";
import { Skill } from '@/app/generated/prisma/browser';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

const ReactJson = dynamic(() => import("react-json-view"), {
  ssr: false,
});

type Props = {
    title?: string;
    src: Skill[];
}

export default function Code({ title, src }: Props) {
    const { theme, systemTheme } = useTheme();
    const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");
    const t = useTranslations();

    return (
        <>
            {title && <p className="h4 mt-5 -mb-3">{t(title)}:</p>}
            <ReactJson
                src={src}
                theme={isDark ? "monokai" : "apathy:inverted"}
                displayDataTypes={false}
                style={{
                    marginBlock: "20px",
                    padding: "10px",
                    borderRadius: "10px",
                    overflowX: "scroll"
                }}
            />
        </>
    )
}