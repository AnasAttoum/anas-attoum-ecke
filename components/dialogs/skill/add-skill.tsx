import { Skill } from "@/app/generated/prisma/browser";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { SparkleIcon } from "lucide-react";
import useSkillLogic from "./useSkillLogic";
import Input from "@/components/inputs/input";
import { ColorPicker } from "@/components/inputs/color-picker";
import SwitchInput from "@/components/inputs/switch-input";

type Props = {
    skill: Skill | boolean;
    setSkill: Dispatch<SetStateAction<boolean | Skill>>
    skillsLength: number;
}

export default function AddSkill({ skill, setSkill, skillsLength = 1 }: Props) {

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
    } = useSkillLogic(skill, skillsLength, setSkill);

    return (
        <>
            <div className="flex justify-end">
                <Button onClick={() => setSkill(true)}>
                    <div className="flex items-center gap-3">
                        <SparkleIcon />
                        {t("add")}
                    </div>
                </Button>
            </div>
            <Dialog open={!!skill} onOpenChange={setSkill}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <DialogHeader>
                            <DialogTitle className="font-semibold mx-auto">
                                {t(isEditing ? "edit-skill" : "add-skill")}
                            </DialogTitle>
                        </DialogHeader>
                        <Input name="name" label="name" register={register} errors={errors} />
                        <ColorPicker defaultValue={getValues().color} setValue={setValue} />
                        <Input name="image" label="image" register={register} errors={errors} />
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
