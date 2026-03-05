"use client";

import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToAnimation from "@/components/gsap/to-animation";
import useFormLogic from "./use-form-logic";
import Input from "@/components/inputs/input";

export default function Form() {

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = useFormLogic()

  return (
    <ToAnimation to="none" order={2} className="col-span-2 lg:col-span-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        <Input name="password" label="password" type="password" register={register} errors={errors} isMainInput />

        <SubmitButton loading={isSubmitting} />
      </form>
    </ToAnimation>
  )
}
