import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toasterError, toasterSuccess } from "@/components/toaster/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/lib/localization/navigation";
import { paths } from "@/lib/paths";

export default function useFormLogic() {

    const t = useTranslations();
    const router = useRouter()

    const formSchema = z.object({
        password: z
            .string()
            .min(1, t("validation.required")),
    });
    type FormValues = z.infer<typeof formSchema>;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: { password: "" },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async ({ password }: FormValues) => {
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });
            if (!res.ok) {
                throw new Error(t("toaster.incorrect-password"));
            }

            reset();
            toasterSuccess(t("toaster.access-granted"));
            router.push(paths.dashboard)
        } catch (error) {
            if (error instanceof Error) {
                toasterError(error?.message || t("toaster.error"));
            } else {
                toasterError(t("toaster.error"));
            }
        }
    }

    return {
        t,
        register,
        handleSubmit,
        onSubmit,
        errors,
        isSubmitting,
    }
}
