import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { HTMLInputTypeAttribute } from "react";
import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    label: string;
    type?: HTMLInputTypeAttribute;
    isMainInput?: boolean;
};

export default function Input<T extends FieldValues>({ register, errors, name, type = "text", label, isMainInput = false }: Props<T>) {
    const t = useTranslations();

    const error = errors[name];

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className={cn(isMainInput && "h4")}>
                {t(label)}
            </label>

            <input type={type} id={name} {...register(name)} className={cn(isMainInput && "mainInput")} />

            {error && (
                <p className="errorMsg">
                    {error.message as string}
                </p>
            )}
        </div>
    );
}
