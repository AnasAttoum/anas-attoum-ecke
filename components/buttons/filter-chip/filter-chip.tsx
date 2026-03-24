import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = { icon?: LucideIcon; label: string; active: boolean; onClick: () => void };

export default function FilterChip({ icon: Icon, label, active, onClick }: Props) {
    const t = useTranslations();

    return (
        <div
            onClick={onClick}
            className={clsx(
                "h4 chip cursor-pointer transition-all duration-100 flex items-center gap-1",
                active ? "scale-105" : "bg-gray!"
            )}
        >
            {!!Icon && <Icon size={20} />}
            {t(label)}
        </div>
    );
}