/*
  Warnings:

  - You are about to drop the column `status` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "status",
ADD COLUMN     "paymentStatus" TEXT;

-- DropEnum
DROP TYPE "PaymentStatus";
