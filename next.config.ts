import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(`${process.env.SKILLS_IMAGES_HOST!}**`),
      new URL(`${process.env.PROJECTS_IMAGES_HOST!}**`),
      new URL(`${process.env.ANAS_ATTOUM_IMAGES_HOST!}**`),
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./lib/localization/request.ts");
export default withNextIntl(nextConfig);
