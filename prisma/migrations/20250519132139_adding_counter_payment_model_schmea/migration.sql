-- CreateTable
CREATE TABLE "CounterPayment" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "store" TEXT NOT NULL,

    CONSTRAINT "CounterPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CounterPayment_transactionId_key" ON "CounterPayment"("transactionId");

-- AddForeignKey
ALTER TABLE "CounterPayment" ADD CONSTRAINT "CounterPayment_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
