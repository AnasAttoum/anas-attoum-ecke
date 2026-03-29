"use client";

import ToAnimation, { ToAnimationWrapper } from "@/components/gsap/to-animation";
import { cn, detectChanges } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToggleEnableDialog from "@/components/dialogs/toggle-enable-dialog";
import DeleteDialog from "@/components/dialogs/delete-dialog";
import EditButton from "@/components/buttons/edit/edit";
import { DragDropProvider } from '@dnd-kit/react';
import { useSortable } from '@dnd-kit/react/sortable';
import { move } from '@dnd-kit/helpers';
import { useRouter } from "@/lib/localization/navigation";
import { catchError, checkIfResIsOk } from "@/lib/errors";
import PhotoViewer from "@/components/photo/photo-viewer";
import { SocialMedia } from "@/app/generated/prisma/browser";
import AddSocial from "@/components/dialogs/social-media/add-social";

export default function SocialTable({ socials, socialsHost, socialsSource }: { socials: SocialMedia[]; socialsHost: string; socialsSource: string }) {

    const t = useTranslations();
    const router = useRouter();

    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [createNewOrder, setCreateNewOrder] = useState(false);
    const [social, setSocial] = useState<SocialMedia | boolean>(false);
    const [editedSocials, setEditedSocials] = useState(socials);
    const enabledSocials = editedSocials.filter(({ enabled }) => enabled);

    useEffect(() => {
        setEditedSocials(socials)
    }, [socials, setEditedSocials])

    const submit = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/social-media/edit-orders`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(detectChanges(socials, editedSocials)),
            });

            await checkIfResIsOk(t, res, router);

            setConfirmed(false);
        } catch (error) {
            catchError(t, error)
        } finally {
            setLoading(false);
        }
    }

    const resetOrder = () => {
        setEditedSocials(socials);

        setCreateNewOrder(false);
        setConfirmed(false);
    };


    return (
        <section className="flex flex-col gap-5">

            <AddSocial social={social} setSocial={setSocial} socialsLength={socials.length} enabledLength={enabledSocials.length} socialsHost={socialsHost} socialsSource={socialsSource} />

            <DragDropProvider
                onDragEnd={(event) => {
                    setEditedSocials((items) => {
                        setCreateNewOrder(true);

                        const newItems = move(items, event);

                        return newItems.map((item, index) => ({
                            ...item,
                            order: newItems.length - index,
                        }));
                    });
                }}
            >
                <div className="flex flex-col gap-5 text-black mb-5">
                    {editedSocials.map((social, index) =>
                        <SocialItem
                            key={social.id}
                            social={social}
                            index={index}
                            confirmed={confirmed}
                            setSocial={setSocial}
                            orderChanged={social.id !== socials?.[index]?.id}
                            socialsHost={socialsHost}
                            createNewOrder={createNewOrder}
                        />
                    )}
                </div>
            </DragDropProvider>

            {confirmed &&
                <div className="pb-5 bg-primary/50 rounded-md">
                    {/* <socials socials={enabledsocials} socialsHost={socialsHost} /> */}
                </div>
            }

            <div>
                {!confirmed
                    ? createNewOrder
                        ? <ToAnimation to="top">
                            <button onClick={() => setConfirmed(true)} className="secondaryBtn">{t("next")}</button>
                        </ToAnimation>
                        : null
                    :
                    <div className="flex gap-5">
                        <ToAnimation to="top" className="flex-2">
                            <SubmitButton onClick={submit} loading={loading} />
                        </ToAnimation>
                        <ToAnimation to="bottom" className="flex-1">
                            <button onClick={resetOrder} className="secondaryBtn">{t("reset")}</button>
                        </ToAnimation>
                    </div>
                }
            </div>
        </section>
    )
}

export function SocialItem(
    { social, index, confirmed, setSocial, orderChanged, socialsHost, createNewOrder }: {
        social: SocialMedia;
        index: number;
        confirmed: boolean;
        setSocial: Dispatch<SetStateAction<boolean | SocialMedia>>;
        orderChanged: boolean;
        socialsHost: string;
        createNewOrder: boolean;
    }) {
    const { id, alt, order, image, href, enabled } = social;

    const [element, setElement] = useState<Element | null>(null);
    const handleRef = useRef<HTMLDivElement | null>(null);
    const { isDragging } = useSortable({ id, index, element, handle: handleRef });

    return (
        <div
            ref={setElement}
            data-shadow={isDragging || undefined}
            className={cn(
                confirmed && "grayscale pointer-events-none",
            )}
        >
            <ToAnimationWrapper preventAnimation={orderChanged || createNewOrder} index={index}>
                <div
                    className={cn(
                        "relative shadow dark:shadow-dark rounded-md bg-light p-5 px-10 grid grid-cols-1 min-[350px]:grid-cols-2 md:grid-cols-4 gap-5",
                        !enabled && "bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,var(--secondary)_10px,var(--secondary)_20px)]",
                        orderChanged && "border-4 border-primary"
                    )}
                >
                    <div ref={handleRef} className="absolute top-0 -left-4 flex items-center h-full cursor-grab">
                        <div className="bg-primary p-3 text-white rounded-md">{order}.</div>
                    </div>

                    <strong>{alt}</strong>

                    <PhotoViewer src={socialsHost + image} alt={alt} />

                    <div className="flex justify-center items-center gap-2">
                        {/* <ToggleEnableDialog item={social} socialsHost={socialsHost} />
                        <EditButton openDialog={() => setSocial(social)} />
                        <DeleteDialog item={social} socialsHost={socialsHost} /> */}
                    </div>
                </div>
            </ToAnimationWrapper>
        </div>
    )
}