import { Information } from "@/app/generated/prisma/client";
import NoResultsFound from "@/components/toaster/no-results-found";
import prisma, { prismaSelect } from "@/lib/prisma";
import CV from "@/sections/cv/cv";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("cv"),
  };
}

export default async function Page() {
  const info = await prisma.information.findFirst(prismaSelect("cv_de", "cv_en")) as Pick<Information, "cv_de" | "cv_en"> | null;

  if (!info) {
    return <NoResultsFound />;
  }

  return <CV info={info} />;
}