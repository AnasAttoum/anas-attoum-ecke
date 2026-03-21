"use client"

import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { catchError, checkIfResIsOk } from "@/lib/errors";
import { Project } from "@/app/generated/prisma/browser";
import { projectTypes } from "@/lib/utils";

export default function useProjectLogic(
  project: Project | boolean,
  setproject: Dispatch<SetStateAction<boolean | Project>>,
) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = typeof project === "object";

  const formSchema = z.object({
    name: z.string().min(1, t("validation.required")),
    type: z.enum(projectTypes, t("validation.required")),
    code: z
      .string()
      .min(1, t("validation.required"))
      .pipe(z.url({ message: t("validation.invalid-url") })),
    demo: z
      .string()
      .min(1, t("validation.required"))
      .pipe(z.url({ message: t("validation.invalid-url") })),
    description_de: z.string().min(1, t("validation.required")),
    description_en: z.string().min(1, t("validation.required")),
    technologies: z
      .array(z.string().min(1, t("validation.required")))
      .min(1, t("validation.required")),
    video: z
      .string()
      .min(1, t("validation.required"))
      .pipe(z.url({ message: t("validation.invalid-url") })),
    image: z.string().min(1, t("validation.required")),
    mockup: z.string().min(1, t("validation.required")),
    logo: z.string().min(1, t("validation.required")),
    enabled: z.boolean(),
  });
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues = useMemo(
    () => ({
      name: "",
      type: projectTypes[0],
      code: "",
      demo: "",
      description_de: "",
      description_en: "",
      technologies: [],
      video: "",
      image: "",
      mockup: "",
      logo: "",
      enabled: false,
    }),
    [],
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
  console.log('getValues: ', getValues());

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(
        `/api/projects/${isEditing ? project.id : "add"}`,
        {
          method: isEditing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        },
      );

      await checkIfResIsOk(t, res, router);

      setproject(false);
      reset();
    } catch (error) {
      catchError(t, error);
    }
  };

  useEffect(() => {
    if (!project) return;

    if (typeof project === "object") reset(project);
    else reset(defaultValues);
  }, [project, reset, defaultValues]);

  const watchImage = useWatch({
    control,
    name: "image",
  });
  const watchMockup = useWatch({
    control,
    name: "mockup",
  });
  const watchLogo = useWatch({
    control,
    name: "logo",
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
    watchMockup,
    watchLogo
  };
}
