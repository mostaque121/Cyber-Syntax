/*
  Warnings:

  - A unique constraint covering the columns `[orderId,type]` on the table `OrderDocument` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OrderDocument_orderId_type_key" ON "OrderDocument"("orderId", "type");
