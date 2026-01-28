/*
  Warnings:

  - Added the required column `price` to the `CCTVPackage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CCTVPackage" ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
