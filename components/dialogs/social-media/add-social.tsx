import { SocialMedia } from "@/app/generated/prisma/browser";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { SparkleIcon, Tv } from "lucide-react";
import Input from "@/components/inputs/input";
import SwitchInput from "@/components/inputs/switch-input";
import ImageInput from "@/components/inputs/image-input";
import useSocialLogic from "./use-social-logic";

type Props = {
    social: SocialMedia | boolean;
    setSocial: Dispatch<SetStateAction<boolean | SocialMedia>>
    socialsLength: number;
    enabledLength: number;
    socialsHost: string;
    socialsSource: string;
}

export default function AddSocial({ social, setSocial, socialsLength = 1, enabledLength = 1, socialsHost, socialsSource }: Props) {

    const {
        t,
        errors,
        handleSubmit,
        isSubmitting,
        onSubmit,
        register,
        control,
        isEditing,
        watchImage,
    } = useSocialLogic(social, setSocial);

    return (
        <>
            <div className="flex justify-end">
                <div className="flex flex-wrap items-center gap-3 max-sm:w-full">
                    <div className="flex gap-3 text-center flex-nowrap">
                        <div>{t("enabled")} : <span className="text-primary font-semibold">{enabledLength}</span></div>
                        <div>/</div>
                        <div>{t('total')} : <span className="text-primary font-semibold">{socialsLength}</span></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:w-full gap-3">
                        <a
                            href={socialsSource}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className="w-full">
                                <div className="flex items-center gap-2">
                                    <Tv />
                                    {t("source")}
                                </div>
                            </Button>
                        </a>
                        <Button onClick={() => setSocial(true)}>
                            <div className="flex items-center gap-2">
                                <SparkleIcon />
                                {t("add")}
                            </div>
                        </Button>
                    </div>
                    
                </div>
            </div>
            <Dialog open={!!social} onOpenChange={setSocial}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <DialogHeader>
                            <DialogTitle className="font-semibold mx-auto">
                                {t(isEditing ? "edit-social" : "add-social")}
                            </DialogTitle>
                        </DialogHeader>

                        <Input name="alt" register={register} errors={errors} />

                        <ImageInput src={socialsHost + watchImage} name="image" register={register} errors={errors} />
                        
                        <Input name="href" label="link" register={register} errors={errors} />

                        <SwitchInput name="enabled" control={control} />

                        <DialogFooter className="max-sm:w-full">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">{t("close")}</Button>
                            </DialogClose>

                            <Button type="submit" loading={isSubmitting}>{t(isEditing ? "edit" : "add")}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
