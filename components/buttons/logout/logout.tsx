"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useRouter } from "@/lib/localization/navigation";
import { TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { paths } from "@/lib/paths";

export default function Logout() {
    const router = useRouter();
    const t = useTranslations();

    const handleLogout = async () => {
        await fetch("/api/logout", {
            method: "POST",
        });

        router.push(paths.login);
    };

    return (
        <Dialog>
            <DialogTrigger className="simpleBtnFocus flex flex-col items-center gap-1 font-semibold text-primary hover:text-secondary">
                <Image
                    src="/icons/more/logout.svg"
                    alt="back"
                    width={20}
                    height={20}
                />
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center gap-10">
                <DialogHeader>
                    <div className='bg-primary/10 mx-auto mb-2 flex size-12 items-center justify-center rounded-full'>
                        <TriangleAlertIcon className='text-primary size-6' />
                    </div>
                    <DialogTitle className="mx-auto">{t("logoutTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("logoutDescription")}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="max-sm:w-full">
                    <DialogClose asChild>
                        <Button type="button">{t("close")}</Button>
                    </DialogClose>

                    <Button type="button" variant="outline" onClick={handleLogout}>{t("logout")}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
