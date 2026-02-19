import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toasterError, toasterSuccess } from "@/components/toaster/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { paths } from "@/lib/paths";

export default function useSkillLogic(skillsLength: number) {
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
      order: skillsLength,
    },
    resolver: zodResolver(formSchema),
  });

  console.log("errors: ", errors, getValues());
  const onSubmit = async (values: FormValues) => {
    try {
      console.log("values: ", values);
      //   const res = await fetch("/api/login", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ password }),
      //   });
      //   if (!res.ok) {
      //     throw new Error(t("toaster.incorrect-password"));
      //   }

      //   toasterSuccess(t("toaster.access-granted"));
      //   router.push(paths.skills);
      // reset();
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
