/*
  Warnings:

  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gross_amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transaction_status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Transaction_orderId_key";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "orderId",
DROP COLUMN "paymentStatus",
ADD COLUMN     "gross_amount" INTEGER NOT NULL,
ADD COLUMN     "order_id" TEXT NOT NULL,
ADD COLUMN     "transaction_status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_order_id_key" ON "Transaction"("order_id");
