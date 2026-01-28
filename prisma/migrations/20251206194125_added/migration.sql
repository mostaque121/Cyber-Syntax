/*
  Warnings:

  - You are about to drop the column `createdAt` on the `BannerSlider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BannerSlider" DROP COLUMN "createdAt",
ALTER COLUMN "link" DROP NOT NULL;
