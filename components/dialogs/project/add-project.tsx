import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { SparkleIcon, Tv } from "lucide-react";
import Input from "@/components/inputs/input";
import SwitchInput from "@/components/inputs/switch-input";
import { Project } from "@/app/generated/prisma/browser";
import useProjectLogic from "./useProjectLogic";
import ImageInput from "@/components/inputs/image-input";
import SelectInput from "@/components/inputs/select-input";
import { projectTypes } from "@/lib/utils";
import { TechnologiesSelect } from "../../inputs/technologies-select";
import EditorInput from "@/components/inputs/editor/editor-input";

type Props = {
    project: Project | boolean;
    setproject: Dispatch<SetStateAction<boolean | Project>>
    projectsLength: number;
    enabledLength: number;
    projectsHost: string;
    projectsSource: string;
    uniqueTechnologies: string[];
}

export default function AddProject({ project, setproject, projectsLength = 1, enabledLength = 1, projectsHost, projectsSource, uniqueTechnologies }: Props) {

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
        watchMockup,
        watchLogo,
    } = useProjectLogic(project, setproject);

    return (
        <>
            <div className="flex justify-end">
                <div className="flex flex-wrap items-center gap-3 max-sm:w-full">
                    <div className="flex gap-3 text-center flex-nowrap">
                        <div>{t("enabled")} : <span className="text-primary font-semibold">{enabledLength}</span></div>
                        <div>/</div>
                        <div>{t('total')} : <span className="text-primary font-semibold">{projectsLength}</span></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:w-full gap-3">
                        <a
                            href={projectsSource}
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
                        <Button onClick={() => setproject(true)}>
                            <div className="flex items-center gap-2">
                                <SparkleIcon />
                                {t("add")}
                            </div>
                        </Button>
                    </div>

                </div>
            </div>
            <Dialog open={!!project} onOpenChange={setproject}>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <DialogHeader>
                            <DialogTitle className="font-semibold mx-auto">
                                {t(isEditing ? "edit-project" : "add-project")}
                            </DialogTitle>
                        </DialogHeader>

                        <Input name="name" register={register} errors={errors} />

                        <SelectInput name="type" control={control} errors={errors} options={projectTypes} />

                        <Input name="code" register={register} errors={errors} />
                        <Input name="demo" register={register} errors={errors} />
                        <Input name="video" register={register} errors={errors} />

                        <EditorInput name="description_de" label={`${t("description")} (DE)`} control={control} errors={errors} withoutTranslate />
                        <EditorInput name="description_en" label={`${t("description")} (EN)`} control={control} errors={errors} withoutTranslate />

                        <ImageInput src={projectsHost + watchImage} name="image" register={register} errors={errors} />
                        <ImageInput src={projectsHost + watchMockup} name="mockup" register={register} errors={errors} />
                        <ImageInput src={projectsHost + watchLogo} name="logo" register={register} errors={errors} />

                        <TechnologiesSelect control={control} name="technologies" options={uniqueTechnologies} />

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
