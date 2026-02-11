"use client";

import { useRouter } from "@/lib/localization/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Back() {
    const router = useRouter();
    const t = useTranslations();

    return (
        <button onClick={() => router.back()} className="simpleBtnFocus flex flex-col items-center gap-1 font-semibold text-primary hover:text-secondary rounded-none!">
            <Image
                src="/icons/more/back.svg"
                alt="back"
                width={20}
                height={20}
            />
            {t("back")}
        </button>
    )
}
