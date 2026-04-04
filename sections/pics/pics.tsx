"use client";

import LetterAnimation from "@/components/gsap/letter-animation";
import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToAnimation from "@/components/gsap/to-animation";
import { PicsType } from "@/app/[locale]/(pages)/pictures/page";
import usePicsLogic from "./use-pics-logic";
import ImageInput from "@/components/inputs/image-input";
import { Button } from "@/components/ui/button";
import { Tv } from "lucide-react";

type Props = {
  info: PicsType;
  AnasAttoumHost: string;
  AnasAttoumSource: string;
};

export default function Pics({ info, AnasAttoumHost, AnasAttoumSource }: Props) {
  const {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    watchAnasAttoum1,
    watchAnasAttoum2,
    isDirty,
  } = usePicsLogic(info);

  return (
    <section>
      <LetterAnimation title="my-pics" className="mt-0" />

      <div className="flex justify-end">
        <a
          href={AnasAttoumSource}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full px-8">
            <div className="flex items-center gap-2">
              <Tv />
              {t("source")}
            </div>
          </Button>
        </a>
      </div>

      <ToAnimation order={2} to="top">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <ImageInput src={AnasAttoumHost + watchAnasAttoum1} name="anas_attoum_1" label={`${t("my-pic")} 1`} withoutTranslate register={register} errors={errors} />
          <ImageInput src={AnasAttoumHost + watchAnasAttoum2} name="anas_attoum_2" label={`${t("my-pic")} 2`} withoutTranslate register={register} errors={errors} />

          {isDirty && <SubmitButton loading={isSubmitting} />}
        </form>
      </ToAnimation>
    </section>
  );
}