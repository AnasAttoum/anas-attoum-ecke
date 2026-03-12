import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import { routing } from '@/lib/localization/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Footer from '@/layouts/footer/footer';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      template: '%s | Anas Attoums Ecke',
      default: 'Anas Attoums Ecke',
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        enableSystem
      >
        {children}
        <Footer />
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}