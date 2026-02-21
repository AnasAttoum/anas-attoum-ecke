import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Switch } from '../ui/switch';
import { useTranslations } from 'next-intl';

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
}

export default function SwitchInput<T extends FieldValues>({ control, name }: Props<T>) {
    const t = useTranslations();
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <div className="flex items-center gap-2">
                    <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    <label>{field.value ? t("enabled") : t("disabled")}</label>
                </div>
            )}
        />
    )
}