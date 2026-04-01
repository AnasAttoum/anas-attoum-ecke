import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { useEffect, useMemo } from "react";
import { catchError, checkIfResIsOk } from "@/lib/errors";
import { AboutType } from "@/app/[locale]/(pages)/about/page";

export default function useAboutLogic(info: AboutType) {
  const t = useTranslations();
  const router = useRouter();

  const formSchema = z.object({
    title_de: z.string().min(1, t("validation.required")),
    title_en: z.string().min(1, t("validation.required")),
    subTitle_de: z.string().min(1, t("validation.required")),
    subTitle_en: z.string().min(1, t("validation.required")),
    about_de: z.string().min(1, t("validation.required")),
    about_en: z.string().min(1, t("validation.required")),
    contact_title_de: z.string().min(1, t("validation.required")),
    contact_title_en: z.string().min(1, t("validation.required")),
    contact_subTitle_de: z.string().min(1, t("validation.required")),
    contact_subTitle_en: z.string().min(1, t("validation.required")),
  });
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues = useMemo(
    () => ({
      title_de: "",
      title_en: "",
      subTitle_de: "",
      subTitle_en: "",
      about_de: "",
      about_en: "",
      contact_title_de: "",
      contact_title_en: "",
      contact_subTitle_de: "",
      contact_subTitle_en: "",
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`/api/informations`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      await checkIfResIsOk(t, res, router);
    } catch (error) {
      catchError(t, error);
    }
  };

  useEffect(() => {
    if (!info) return;
    reset(info);
  }, [reset, info]);

  return {
    t,
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    isDirty,
  };
}
