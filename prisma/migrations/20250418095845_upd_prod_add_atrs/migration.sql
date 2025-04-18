/*
  Warnings:

  - Added the required column `cont` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "cont" INTEGER NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
