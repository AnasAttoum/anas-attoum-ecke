import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { Dispatch, SetStateAction, useEffect, useMemo } from "react";
import { SocialMedia } from "@/app/generated/prisma/browser";
import { catchError, checkIfResIsOk } from "@/lib/errors";

export default function useSocialLogic(
  social: SocialMedia | boolean,
  setSocial: Dispatch<SetStateAction<boolean | SocialMedia>>,
) {
  const t = useTranslations();
  const router = useRouter();
  const isEditing = typeof social === "object";

  const formSchema = z.object({
    alt: z.string().min(1, t("validation.required")),
    image: z.string().min(1, t("validation.required")),
    href: z
      .string()
      .min(1, t("validation.required"))
      .pipe(z.url({ message: t("validation.invalid-url") })),
    enabled: z.boolean(),
  });
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues = useMemo(
    () => ({
      alt: "",
      image: "",
      href: "",
      enabled: false,
    }),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`/api/social-media/${isEditing ? social.id : "add"}`, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      await checkIfResIsOk(t, res, router);

      setSocial(false);
      reset();
    } catch (error) {
      catchError(t, error);
    }
  };

  useEffect(() => {
    if (!social) return;

    if (typeof social === "object") reset(social);
    else reset(defaultValues);
  }, [social, reset, defaultValues]);

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
    control,
    isEditing,
    watchImage,
  };
}
