/*
  Warnings:

  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - Changed the type of `name` on the `Category` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('BOOKS', 'SPORTS');

-- DropIndex
DROP INDEX "Category_name_slug_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "slug",
DROP COLUMN "name",
ADD COLUMN     "name" "CategoryType" NOT NULL;
