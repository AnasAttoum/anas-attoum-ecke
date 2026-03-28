export const dynamic = "force-dynamic";

import { SocialMediaFindManyArgs } from "@/app/generated/prisma/models";
import { ENV } from "@/lib/env";
import prisma, { prismaConfig } from "@/lib/prisma";
import SocialMediaTable from "@/sections/social/social-table";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: t("social-media"),
  };
}

export default async function SocialMedia() {
  const socials = await prisma.socialMedia.findMany(prismaConfig as SocialMediaFindManyArgs);

  return <SocialMediaTable socials={socials} socialsHost={ENV.socialsHost!} socialsSource={ENV.socialsSource!} />;
}
