/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `CCTVPackage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `CCTVPackage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CCTVPackage" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CCTVPackage_slug_key" ON "CCTVPackage"("slug");
