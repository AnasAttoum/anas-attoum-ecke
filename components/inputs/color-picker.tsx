"use client";

import * as React from "react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

type Props<T extends FieldValues> = {
    defaultValue: string;
    setValue: UseFormSetValue<T>;
};

export function ColorPicker<T extends FieldValues>({defaultValue, setValue }: Props<T>) {
    const t = useTranslations();
    const [color, setColor] = React.useState(defaultValue);

    const handleChange = (newColor: string) => {
        setColor(newColor);
        setValue("color" as Path<T>, newColor as PathValue<T, Path<T>>);
    };

    return (
        <div className="flex flex-col">
            <label htmlFor="color">
                {t("color")}
            </label>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        id="color"
                        type="button"
                        className="h-12 rounded-md border-2 border-dark-gray outline-0"
                        style={{ backgroundColor: color }}
                    />
                </PopoverTrigger>

                <PopoverContent className="w-auto p-4">
                    <div className="space-y-3">
                        <HexColorPicker color={color} onChange={handleChange} />

                        <input
                            value={color}
                            onChange={(e) => handleChange(e.target.value)}
                            className="w-full rounded-md border px-2 py-1 text-sm"
                        />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
