import clsx from "clsx";
import { useTranslations } from "next-intl";

type Props = { label: string; active: boolean; onClick: () => void };

export default function FilterChip({ label, active, onClick }: Props) {
    const t = useTranslations();

    return (
        <div
            onClick={onClick}
            className={clsx(
                "h4 chip cursor-pointer transition-all duration-100",
                active ? "scale-105" : "bg-gray!"
            )}
        >
            {t(label)}
        </div>
    );
}