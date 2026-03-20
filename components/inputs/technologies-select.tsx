"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: string[];
};

export function TechnologiesSelect<T extends FieldValues>({
  name,
  label,
  control,
  options,
}: Props<T>) {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const value: string[] = field.value || [];
        const error = fieldState.error;

        const toggleSelect = (item: string) => {
          if (value.includes(item)) {
            field.onChange(value.filter((v) => v !== item));
          } else {
            field.onChange([...value, item]);
          }
        };

        const addNewItem = () => {
          const newItem = input.trim();
          if (!newItem) return;

          if (!value.includes(newItem)) {
            field.onChange([...value, newItem]);
          }

          setInput("");
        };

        const removeItem = (item: string) => {
          field.onChange(value.filter((v) => v !== item));
        };

        return (
          <div className="space-y-2">
            {/* Label */}
            {label && <p className="text-sm font-medium">{label}</p>}

            {/* Dropdown */}
            <Popover open={open} onOpenChange={setOpen}>
              <label>{t("technologies")}</label>
              <PopoverTrigger asChild type="button">
                <Button variant="outline" className="input p-6! bg-transparent!" />
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="p-0 bg-transparent w-(--radix-popover-trigger-width)"
              >
                <Command>
                  <CommandInput
                    placeholder={t("search-or-add")}
                    value={input}
                    onValueChange={setInput}
                  />

                  {!!input && <Button
                    type="button"
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={addNewItem}
                  >
                    {t("add")} <strong>{input}</strong> ?
                  </Button>}

                  <CommandGroup>
                    {options?.map((option) => (
                      <CommandItem
                        key={option}
                        onSelect={() => toggleSelect(option)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value.includes(option) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected Chips */}
            <div className="flex flex-wrap gap-2">
              {value.map((item) => (
                <Badge key={item} variant="secondary" className="flex items-center gap-1 cursor-pointer" onClick={() => removeItem(item)}>
                  {item}
                  <X
                    className="w-3 h-3 cursor-pointer"
                  />
                </Badge>
              ))}
            </div>

            {error && (
              <p className="errorMsg">
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}