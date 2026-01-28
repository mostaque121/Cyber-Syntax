/*
  Warnings:

  - You are about to drop the column `ProductImage` on the `ProductOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductOrder" DROP COLUMN "ProductImage",
ADD COLUMN     "productImage" TEXT;
