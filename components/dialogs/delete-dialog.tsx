import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'
import { useTranslations } from 'next-intl'
import { Project, Skill } from '@/app/generated/prisma/browser'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from '@/lib/localization/navigation'
import { Trash } from 'lucide-react'
import { catchError, checkIfResIsOk } from '@/lib/errors'

type Props = {
    item: Skill | Project;
    skillsHost?: string;
    projectsHost?: string;
}

export default function DeleteDialog({ item, skillsHost, projectsHost }: Props) {
    const t = useTranslations();
    const router = useRouter();
    const { id, name, image } = item;

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/${skillsHost ? "skills" : "projects"}/${id}`, {
                method: "Delete",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ id })
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
            <Trash onClick={() => setOpen(true)} className='p-0.5 cursor-pointer text-red-400' />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="flex flex-col items-center gap-10">
                    <DialogHeader>
                        <div className='relative mx-auto size-12'>
                            <Image src={(skillsHost ?? projectsHost) + image} alt={name} fill className="object-contain" />
                        </div>
                        <DialogTitle className="mx-auto">
                            {t.rich("delete-confirm", {
                                name,
                                strong: (chunks) => <strong>{chunks}</strong>
                            })}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogFooter className="max-sm:w-full">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">{t("close")}</Button>
                        </DialogClose>

                        <Button type="button" onClick={handleDelete} loading={loading}>{t("delete")}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}