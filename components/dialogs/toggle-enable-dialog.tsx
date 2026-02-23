import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { Switch } from '../ui/switch'
import { Skill } from '@/app/generated/prisma/browser'
import Image from 'next/image'
import { useState } from 'react'
import { toasterError, toasterSuccess } from '../toaster/toaster'
import { useRouter } from '@/lib/localization/navigation'

type Props = {
    item: Skill;
}

export default function ToggleEnableDialog({ item }: Props) {
    const t = useTranslations();
    const router = useRouter();
    const { id, name, image, enabled } = item;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSwitch = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/skills/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id, enabled: !enabled })
            });

            if (res.ok) {
                const data = await res.json();
                toasterSuccess(t(data.message));

                setOpen(false);
                router.refresh()
            }
            else {
                if (res.status === 401) router.refresh();
                throw new Error(t((await res.json())?.message || "toaster.error"));
            }
        } catch (error) {
            if (error instanceof Error) {
                toasterError(error?.message || t("toaster.error"));
            } else {
                toasterError(t("toaster.error"));
            }
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <>
            <Switch checked={enabled} onCheckedChange={() => setOpen(true)} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex flex-col items-center gap-10">
                    <DialogHeader>
                        <div className='relative mx-auto size-12'>
                            <Image src={image} alt={name} fill className="object-contain" />
                        </div>
                        <DialogTitle className="mx-auto">
                            {t.rich(enabled ? "disable-confirm" : "enable-confirm", {
                                name,
                                strong: (chunks) => <strong>{chunks}</strong>
                            })}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="max-sm:w-full">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t("close")}</Button>
                        </DialogClose>

                        <Button type="button" onClick={handleSwitch} loading={loading}>{t(enabled ? "disable" : "enable")}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}