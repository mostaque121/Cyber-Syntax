-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('PRODUCT', 'SERVICE', 'LINK');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderType" "OrderType" NOT NULL DEFAULT 'PRODUCT';
