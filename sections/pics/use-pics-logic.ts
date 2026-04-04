import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { useEffect, useMemo } from "react";
import { catchError, checkIfResIsOk } from "@/lib/errors";
import { PicsType } from "@/app/[locale]/(pages)/pictures/page";

export default function usePicsLogic(info: PicsType) {
  const t = useTranslations();
  const router = useRouter();

  const formSchema = z.object({
    anas_attoum_1: z.string().min(1, t("validation.required")),
    anas_attoum_2: z.string().min(1, t("validation.required")),
  });
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues = useMemo(
    () => ({
      anas_attoum_1: "",
      anas_attoum_2: "",
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

  const watchAnasAttoum1 = useWatch({
    control,
    name: "anas_attoum_1",
  });

  const watchAnasAttoum2 = useWatch({
    control,
    name: "anas_attoum_2",
  });

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    watchAnasAttoum1,
    watchAnasAttoum2,
    isDirty,
  };
}
