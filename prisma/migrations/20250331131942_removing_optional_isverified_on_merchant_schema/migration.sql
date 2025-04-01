/*
  Warnings:

  - Made the column `isVerified` on table `Merchant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchant" ALTER COLUMN "isVerified" SET NOT NULL;
