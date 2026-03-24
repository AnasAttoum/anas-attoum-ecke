/*
  Warnings:

  - You are about to drop the column `password_hash` on the `Information` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Information" DROP COLUMN "password_hash";
