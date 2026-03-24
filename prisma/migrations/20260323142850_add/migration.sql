/*
  Warnings:

  - Added the required column `cv_de` to the `Information` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cv_en` to the `Information` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Information" ADD COLUMN     "cv_de" TEXT NOT NULL,
ADD COLUMN     "cv_en" TEXT NOT NULL;
