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
    withoutTranslate?: boolean;
};

export default function ImageInput<T extends FieldValues>({ register, errors, name, label, withoutTranslate = false, src }: Props<T>) {
    const t = useTranslations();
    const [zoomIn, setZoomIn] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <Input name={name} label={label ?? name} withoutTranslate={withoutTranslate} register={register} errors={errors} />
            <Image
                src={src}
                alt={withoutTranslate
                    ? label ?? name
                    : t(label ?? name)
                }
                width={!zoomIn ? 50 : 460}
                height={!zoomIn ? 50 : 460}
                unoptimized className="mx-auto transition cursor-pointer"
                onClick={() => setZoomIn((prev) => !prev)}
            />
        </div>
    );
}
