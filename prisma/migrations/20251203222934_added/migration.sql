/*
  Warnings:

  - Made the column `serialNumber` on table `ProductOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductOrder" ALTER COLUMN "serialNumber" SET NOT NULL,
ALTER COLUMN "serialNumber" SET DEFAULT '1';
