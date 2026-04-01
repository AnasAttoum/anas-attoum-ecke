"use client";

import LetterAnimation from "@/components/gsap/letter-animation";
import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToAnimation from "@/components/gsap/to-animation";
import { AboutType } from "@/app/[locale]/(pages)/about/page";
import useAboutLogic from "./use-about-logic";
import Input from "@/components/inputs/input";
import EditorInput from "@/components/inputs/editor/editor-input";

type Props = {
  info: AboutType;
};

export default function About({ info }: Props) {
  const {
    t,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isDirty,
  } = useAboutLogic(info);

  return (
    <section>
      <LetterAnimation title="about" className="mt-0" />
      <ToAnimation order={2} to="top">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <EditorInput name="title_de" label={`${t("title")} (DE)`} withoutTranslate control={control} errors={errors} />
          <EditorInput name="title_en" label={`${t("title")} (EN)`} withoutTranslate control={control} errors={errors} />

          <Input name="subTitle_de" label={`${t("subTitle")} (DE)`} withoutTranslate register={register} errors={errors} />
          <Input name="subTitle_en" label={`${t("subTitle")} (EN)`} withoutTranslate register={register} errors={errors} />
          
          <EditorInput name="about_de" label={`${t("about")} (DE)`} withoutTranslate control={control} errors={errors} />
          <EditorInput name="about_en" label={`${t("about")} (EN)`} withoutTranslate control={control} errors={errors} />

          <EditorInput name="contact_title_de" label={`${t("contact-title")} (DE)`} withoutTranslate control={control} errors={errors} />
          <EditorInput name="contact_title_en" label={`${t("contact-title")} (EN)`} withoutTranslate control={control} errors={errors} />

          <EditorInput name="contact_subTitle_de" label={`${t("contact-subTitle")} (DE)`} withoutTranslate control={control} errors={errors} />
          <EditorInput name="contact_subTitle_en" label={`${t("contact-subTitle")} (EN)`} withoutTranslate control={control} errors={errors} />

          {isDirty && <SubmitButton loading={isSubmitting} />}
        </form>
      </ToAnimation>
    </section>
  );
}