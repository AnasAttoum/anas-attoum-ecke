import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";
import Input from "./input";
import Image from "next/image";

type Props<T extends FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    label: string;
    src: string;
};

export default function ImageInput<T extends FieldValues>({ register, errors, name, label, src }: Props<T>) {
    const t = useTranslations();

    return (
        <>
            <Input name={name} label={label} register={register} errors={errors} />
            <Image src={src} alt={t(label)} width={50} height={50} className="mx-auto" />
        </>
    );
}
