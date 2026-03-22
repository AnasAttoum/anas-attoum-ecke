import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";
import Input from "./input";
import Image from "next/image";
import { useState } from "react";

type Props<T extends FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    label?: string;
    src: string;
};

export default function ImageInput<T extends FieldValues>({ register, errors, name, label, src }: Props<T>) {
    const t = useTranslations();
    const [zoomIn, setZoomIn] = useState(false);

    return (
        <>
            <Input name={name} label={label ?? name} register={register} errors={errors} />
            <Image src={src} alt={t(label ?? name)} width={!zoomIn ? 50 : 500} height={!zoomIn ? 50 : 500} className="mx-auto transition" onClick={() => setZoomIn((prev) => !prev)} />
        </>
    );
}
