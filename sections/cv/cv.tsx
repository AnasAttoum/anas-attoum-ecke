"use client";

import { Information } from "@/app/generated/prisma/browser";
import useCvLogic from "./use-cv-logic";
import LetterAnimation from "@/components/gsap/letter-animation";
import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToAnimation from "@/components/gsap/to-animation";
import FileInput from "@/components/inputs/file-input";

type Props = {
  info: Pick<Information, "cv_de" | "cv_en">
};

export default function CV({ info }: Props) {
  const {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    watchCvDe,
    watchCvEn,
    isDirty,
  } = useCvLogic(info);

  return (
    <section>
      <LetterAnimation title="cv" className="mt-0" />
      <ToAnimation order={2} to="top">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FileInput name="cv_de" label={`${t("cv")} (DE)`} withoutTranslate watchValue={watchCvDe} register={register} errors={errors} />
          <FileInput name="cv_en" label={`${t("cv")} (EN)`} withoutTranslate watchValue={watchCvEn} register={register} errors={errors} />

          {isDirty && <SubmitButton loading={isSubmitting} />}
        </form>
      </ToAnimation>
    </section>
  );
}