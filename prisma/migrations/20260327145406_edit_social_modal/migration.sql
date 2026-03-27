/*
  Warnings:

  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SocialLink";

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "alt" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);
