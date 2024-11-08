/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_orderId_key" ON "Transaction"("orderId");
