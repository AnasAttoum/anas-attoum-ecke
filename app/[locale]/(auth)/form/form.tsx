"use client";

import SubmitButton from "@/components/buttons/submit-button/submit-button";
import ToAnimation from "@/components/gsap/to-animation";
import useFormLogic from "./use-form-logic";

export default function Form() {

  const {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = useFormLogic()

  return (
    <ToAnimation to="none" order={2} className="col-span-2 lg:col-span-1">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

        <div>
          <label htmlFor="password" className="h4">
            {t("password")}
          </label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p className="errorMsg">
              {errors.password.message}
            </p>
          )}
        </div>

        <SubmitButton loading={isSubmitting} disabled={isSubmitting} />
      </form>
    </ToAnimation>
  )
}
