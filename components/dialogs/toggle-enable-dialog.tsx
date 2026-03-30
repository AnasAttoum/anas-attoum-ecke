import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { Switch } from '../ui/switch'
import { Project, Skill, SocialMedia } from '@/app/generated/prisma/browser'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from '@/lib/localization/navigation'
import { catchError, checkIfResIsOk } from '@/lib/errors'

type Props = {
    item: Skill | Project | SocialMedia;
    skillsHost?: string;
    projectsHost?: string;
    socialsHost?: string;
}

export default function ToggleEnableDialog({ item, skillsHost, projectsHost, socialsHost }: Props) {
    const t = useTranslations();
    const router = useRouter();
    const { id, image, enabled } = item;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const target = skillsHost ? "skills" : projectsHost ? "projects" : "social-media";
    const targetHost = skillsHost ?? projectsHost ?? socialsHost;
    const targetName = socialsHost ? (item as SocialMedia)?.alt : (item as Skill)?.name;

    const handleSwitch = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/${target}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id, enabled: !enabled })
            });

            await checkIfResIsOk(t, res, router);

            setOpen(false);
        } catch (error) {
            catchError(t, error)
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
                            <Image src={targetHost + image} alt={targetName} fill unoptimized className="object-contain" />
                        </div>
                        <DialogTitle className="mx-auto">
                            {t.rich(enabled ? "disable-confirm" : "enable-confirm", {
                                name: targetName,
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