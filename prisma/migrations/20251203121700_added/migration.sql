/*
  Warnings:

  - You are about to drop the column `issuedBy` on the `OrderDocument` table. All the data in the column will be lost.
  - Added the required column `issuedByUserId` to the `OrderDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDocument" DROP COLUMN "issuedBy",
ADD COLUMN     "issuedByUserId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderDocument" ADD CONSTRAINT "OrderDocument_issuedByUserId_fkey" FOREIGN KEY ("issuedByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
