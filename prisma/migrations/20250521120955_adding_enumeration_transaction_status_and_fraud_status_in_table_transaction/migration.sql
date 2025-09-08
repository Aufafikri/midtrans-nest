/*
  Warnings:

  - The `fraudStatus` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transaction_status` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('capture', 'settlment', 'pending', 'deny', 'cancel', 'expire', 'failure', 'refund', 'partial_refund', 'authorize');

-- CreateEnum
CREATE TYPE "FraudStatus" AS ENUM ('accept', 'deny');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "fraudStatus",
ADD COLUMN     "fraudStatus" "FraudStatus",
DROP COLUMN "transaction_status",
ADD COLUMN     "transaction_status" "TransactionStatus";
