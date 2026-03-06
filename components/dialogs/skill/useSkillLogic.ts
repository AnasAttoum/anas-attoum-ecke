import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { Skill } from "@/app/generated/prisma/browser";
import { catchError, checkIfResIsOk } from "@/lib/errors";

export default function useSkillLogic(
  skill: Skill | boolean,
  skillsLength: number,
  setSkill: Dispatch<SetStateAction<boolean | Skill>>,
) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = typeof skill === "object";

  const formSchema = z.object({
    name: z.string().min(1, t("validation.required")),
    color: z.string().min(1, t("validation.required")),
    image: z.string().min(1, t("validation.required")),
    enabled: z.boolean(),
    order: z.number().min(1, t("validation.required")),
  });
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues = useMemo(
    () => ({
      name: "",
      color: "#a886e4",
      image: "",
      enabled: false,
      order: skillsLength + 1,
    }),
    [skillsLength],
  );

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`/api/skills/${isEditing ? skill.id : "add"}`, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      await checkIfResIsOk(t, res, router);

      setSkill(false);
      reset();
    } catch (error) {
      catchError(t, error);
    }
  };

  useEffect(() => {
    if (!skill) return;

    if (typeof skill === "object") reset(skill);
    else reset(defaultValues);
  }, [skill, reset, defaultValues]);

  const watchImage = useWatch({
    control,
    name: "image",
  });

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    getValues,
    setValue,
    control,
    isEditing,
    watchImage,
  };
}
