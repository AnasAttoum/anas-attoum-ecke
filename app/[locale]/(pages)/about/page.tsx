import { Information } from "@/app/generated/prisma/client";
import NoResultsFound from "@/components/toaster/no-results-found";
import prisma, { prismaSelect } from "@/lib/prisma";
import About from "@/sections/about/about";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("about"),
  };
}
export type AboutType = Pick<Information, "title_de" | "title_en" | "subTitle_de" | "subTitle_en" | "about_de" | "about_en" | "contact_title_de" | "contact_title_en" | "contact_subTitle_de" | "contact_subTitle_en"> | null;

export default async function Page() {
  const info = await prisma.information
    .findFirst(
      prismaSelect(
        "title_de", "title_en", "subTitle_de", "subTitle_en", "about_de", "about_en", "contact_title_de", "contact_title_en", "contact_subTitle_de", "contact_subTitle_en"
      )
    ) as AboutType;

  if (!info) {
    return <NoResultsFound />;
  }

  return <About info={info} />;
}