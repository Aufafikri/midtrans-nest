-- DropForeignKey
ALTER TABLE "CounterPayment" DROP CONSTRAINT "CounterPayment_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "CounterPayment" ADD CONSTRAINT "CounterPayment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
