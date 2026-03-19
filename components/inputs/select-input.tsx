import { useTranslations } from "next-intl";
import {
  FieldErrors,
  FieldValues,
  Path,
  Control,
  Controller
} from "react-hook-form";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type Option = {
  value: string | number;
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  label?: string;
  options: Option[] | string[];
};

export default function SelectInput<T extends FieldValues>({ control, errors, name, label, options }: Props<T>) {
  const t = useTranslations();
  const error = errors[name];

  return (
    <div className="flex flex-col">
      <label>{t(label ?? name)}</label>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ShadcnSelect
            value={field.value?.toString()}
            onValueChange={field.onChange}
          >
            <SelectTrigger>
              <SelectValue
              // placeholder={t(label ?? name)}
              />
            </SelectTrigger>

            <SelectContent position="popper">
              {options.map((el) => {
                const option =
                  typeof el === "string"
                    ? { label: el, value: el }
                    : el;

                return (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {t(option.label)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </ShadcnSelect>
        )}
      />

      {error && (
        <p className="errorMsg">{error.message as string}</p>
      )}
    </div>
  );
}