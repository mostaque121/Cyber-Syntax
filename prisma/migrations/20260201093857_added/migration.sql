/*
  Warnings:

  - Made the column `imageSmall` on table `BannerSlider` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `imageSmall` to the `SingleBanner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BannerSlider" ALTER COLUMN "imageSmall" SET NOT NULL;

-- AlterTable
ALTER TABLE "SingleBanner" ADD COLUMN     "imageSmall" TEXT NOT NULL;
