-- CreateEnum
CREATE TYPE "projectType" AS ENUM ('project', 'page', 'game', 'component');

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "type" "projectType" NOT NULL,
    "code" TEXT NOT NULL,
    "demo" TEXT NOT NULL,
    "description_de" TEXT NOT NULL,
    "description_en" TEXT NOT NULL,
    "technologies" TEXT[],
    "video" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "mockup" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
