import { defineRouting } from "next-intl/routing";

export const localesDetails = [
  { locale: "de", label: "DE", src: "/icons/localization/de.svg" },
  { locale: "en", label: "EN", src: "/icons/localization/en.svg" },
] as const;

export const locales = localesDetails.map(({ locale }) => locale);
export const defaultLocale = "de";

export type localesType = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});
