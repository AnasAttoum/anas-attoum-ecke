import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form'
import { SimpleEditor } from './tiptap-templates/simple/simple-editor'
import { HTMLInputTypeAttribute } from 'react';
import { useTranslations } from 'next-intl';

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    errors: FieldErrors<T>;
    label?: string;
    type?: HTMLInputTypeAttribute;
    isMainInput?: boolean;
    withoutTranslate?: boolean;
};

export default function EditorInput<T extends FieldValues>({ control, errors, name, label, withoutTranslate = false }: Props<T>) {
    const t = useTranslations();

    const error = errors[name];

    return (
        <div className="flex flex-col">
            <label htmlFor={name}>
                {withoutTranslate ? label ?? name : t(label ?? name)}
            </label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <SimpleEditor
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />

            {error && (
                <p className="errorMsg">
                    {error.message as string}
                </p>
            )}
        </div>
    )
}