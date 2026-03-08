import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function detectChanges(
  oldData: { id: string; order: number }[],
  newData: { id: string; order: number }[],
) {
  return newData.filter((el) => {
    const find = oldData.find(({ id }) => id === el.id);
    if (!find || find.order === el.order) return false;
    return true;
  });
}
