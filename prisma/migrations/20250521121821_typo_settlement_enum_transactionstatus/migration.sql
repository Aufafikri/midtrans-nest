/*
  Warnings:

  - The values [settlment] on the enum `TransactionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionStatus_new" AS ENUM ('capture', 'settlement', 'pending', 'deny', 'cancel', 'expire', 'failure', 'refund', 'partial_refund', 'authorize');
ALTER TABLE "Transaction" ALTER COLUMN "transaction_status" TYPE "TransactionStatus_new" USING ("transaction_status"::text::"TransactionStatus_new");
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";
ALTER TYPE "TransactionStatus_new" RENAME TO "TransactionStatus";
DROP TYPE "TransactionStatus_old";
COMMIT;
