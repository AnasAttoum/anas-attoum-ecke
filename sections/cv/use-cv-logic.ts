import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { useEffect, useMemo } from "react";
import { Information } from "@/app/generated/prisma/browser";
import { catchError, checkIfResIsOk } from "@/lib/errors";

export default function useCvLogic(info: Pick<Information, "cv_de" | "cv_en">) {
  const t = useTranslations();
  const router = useRouter();

  const formSchema = z.object({
    cv_de: z.string().min(1, t("validation.required")),
    cv_en: z.string().min(1, t("validation.required")),
  });
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues = useMemo(
    () => ({
      cv_de: "",
      cv_en: "",
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isDirty  },
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

  const watchCvDe = useWatch({
    control,
    name: "cv_de",
  });

  const watchCvEn = useWatch({
    control,
    name: "cv_en",
  });

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    watchCvDe,
    watchCvEn,
    isDirty,
  };
}
