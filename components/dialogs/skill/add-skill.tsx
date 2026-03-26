import { Skill } from "@/app/generated/prisma/browser";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { SparkleIcon, Tv } from "lucide-react";
import useSkillLogic from "./use-skill-logic";
import Input from "@/components/inputs/input";
import { ColorPicker } from "@/components/inputs/color-picker";
import SwitchInput from "@/components/inputs/switch-input";
import ImageInput from "@/components/inputs/image-input";

type Props = {
    skill: Skill | boolean;
    setSkill: Dispatch<SetStateAction<boolean | Skill>>
    skillsLength: number;
    enabledLength: number;
    skillsHost: string;
    skillsSource: string;
}

export default function AddSkill({ skill, setSkill, skillsLength = 1, enabledLength = 1, skillsHost, skillsSource }: Props) {

    const {
        t,
        errors,
        handleSubmit,
        isSubmitting,
        onSubmit,
        register,
        getValues,
        setValue,
        control,
        isEditing,
        watchImage,
    } = useSkillLogic(skill, setSkill);

    return (
        <>
            <div className="flex justify-end">
                <div className="flex flex-wrap items-center gap-3 max-sm:w-full">
                    <div className="flex gap-3 text-center flex-nowrap">
                        <div>{t("enabled")} : <span className="text-primary font-semibold">{enabledLength}</span></div>
                        <div>/</div>
                        <div>{t('total')} : <span className="text-primary font-semibold">{skillsLength}</span></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:w-full gap-3">
                        <a
                            href={skillsSource}
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
                        <Button onClick={() => setSkill(true)}>
                            <div className="flex items-center gap-2">
                                <SparkleIcon />
                                {t("add")}
                            </div>
                        </Button>
                    </div>
                    
                </div>
            </div>
            <Dialog open={!!skill} onOpenChange={setSkill}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <DialogHeader>
                            <DialogTitle className="font-semibold mx-auto">
                                {t(isEditing ? "edit-skill" : "add-skill")}
                            </DialogTitle>
                        </DialogHeader>

                        <Input name="name" register={register} errors={errors} />

                        <ColorPicker defaultValue={getValues().color} setValue={setValue} />

                        <ImageInput src={skillsHost + watchImage} name="image" register={register} errors={errors} />

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
