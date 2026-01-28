/*
  Warnings:

  - Changed the type of `serviceType` on the `ServiceOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('IT_SUPPORT', 'CCTV_SOLUTION', 'NETWORKING_SOLUTION', 'SOFTWARE_DEVELOPMENT');

-- AlterTable
ALTER TABLE "ServiceOrder" DROP COLUMN "serviceType",
ADD COLUMN     "serviceType" "ServiceType" NOT NULL;
