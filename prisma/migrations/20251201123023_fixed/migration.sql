/*
  Warnings:

  - You are about to drop the column `productsList` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `serviceList` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productBrand` on the `ProductOrder` table. All the data in the column will be lost.
  - You are about to drop the column `productImage` on the `ProductOrder` table. All the data in the column will be lost.
  - Added the required column `name` to the `ServiceOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "productsList",
DROP COLUMN "serviceList",
DROP COLUMN "totalAmount",
ADD COLUMN     "serviceCost" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductOrder" DROP COLUMN "productBrand",
DROP COLUMN "productImage",
ADD COLUMN     "serialNumber" TEXT,
ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ServiceOrder" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
