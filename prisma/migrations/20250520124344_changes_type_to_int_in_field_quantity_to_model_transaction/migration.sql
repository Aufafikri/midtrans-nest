/*
  Warnings:

  - The `quantity` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER;
