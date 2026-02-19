import { Control, Controller, FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { Switch } from '../ui/switch';

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label: string;
}

export default function SwitchInput<T extends FieldValues>({ control, name, label }: Props<T>) {
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
                    <label>{label}</label>
                </div>
            )}
        />
    )
}