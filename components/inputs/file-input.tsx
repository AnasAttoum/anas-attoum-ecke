import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";
import Input from "./input";

type Props<T extends FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    label?: string;
    watchValue: string;
    withoutTranslate?: boolean;
};

export default function FileInput<T extends FieldValues>({ register, errors, name, label, watchValue, withoutTranslate = false }: Props<T>) {
    return (
        <>
            <Input name={name} label={label ?? name} withoutTranslate={withoutTranslate} register={register} errors={errors} />
            {watchValue && <iframe src={watchValue} className="rounded-md min-h-96" />}
        </>
    );
}
