-- CreateTable
CREATE TABLE "Information" (
    "id" TEXT NOT NULL,
    "title_de" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "subTitle_de" TEXT NOT NULL,
    "subTitle_en" TEXT NOT NULL,
    "about_de" TEXT NOT NULL,
    "about_en" TEXT NOT NULL,
    "anas_attoum_1" TEXT NOT NULL,
    "anas_attoum_2" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "contact_title_de" TEXT NOT NULL,
    "contact_title_en" TEXT NOT NULL,
    "contact_subTitle_de" TEXT NOT NULL,
    "contact_subTitle_en" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Information_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "alt" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);
