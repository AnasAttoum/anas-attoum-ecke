import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toasterError, toasterSuccess } from "@/components/toaster/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { paths } from "@/lib/paths";
import { Dispatch, SetStateAction } from "react";
import { Skill } from "@/app/generated/prisma/browser";

export default function useSkillLogic(
  skillsLength: number,
  setSkill: Dispatch<SetStateAction<boolean | Skill>>,
) {
  const t = useTranslations();
  const router = useRouter();

  const formSchema = z.object({
    name: z.string().min(1, t("validation.required")),
    color: z.string().min(1, t("validation.required")),
    image: z.string().min(1, t("validation.required")),
    enabled: z.boolean(),
    order: z.number().min(1, t("validation.required")),
  });
  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      color: "#a886e4",
      image: "",
      enabled: false,
      order: skillsLength + 1,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch("/api/skills/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(t("toaster.error"));
      }

      const data = await res.json();
      toasterSuccess(t(data.message));
      
      setSkill(false);
      router.push(paths.skills);
      reset();
    } catch (error) {
      if (error instanceof Error) {
        toasterError(error?.message || t("toaster.error"));
      } else {
        toasterError(t("toaster.error"));
      }
    }
  };

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
  };
}
