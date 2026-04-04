import { Information } from "@/app/generated/prisma/client";
import NoResultsFound from "@/components/toaster/no-results-found";
import { ENV } from "@/lib/env";
import prisma, { prismaSelect } from "@/lib/prisma";
import Pics from "@/sections/pics/pics";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("my-pics"),
  };
}

export type PicsType = Pick<Information, "anas_attoum_1" | "anas_attoum_2"> | null;

export default async function Page() {
  const info = await prisma.information.findFirst(prismaSelect("anas_attoum_1", "anas_attoum_2")) as PicsType;

  if (!info) {
    return <NoResultsFound />;
  }

  return <Pics info={info} AnasAttoumHost={ENV.AnasAttoumHost!} AnasAttoumSource={ENV.AnasAttoumSource!} />;
}