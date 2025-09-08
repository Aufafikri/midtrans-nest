-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "fraudStatus" TEXT,
ADD COLUMN     "paymentType" TEXT,
ADD COLUMN     "paymentUrl" TEXT,
ADD COLUMN     "transactionTime" TIMESTAMP(3);
