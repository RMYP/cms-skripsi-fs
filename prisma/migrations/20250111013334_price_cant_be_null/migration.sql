/*
  Warnings:

  - Made the column `totalPrice` on table `Chart` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chart" ALTER COLUMN "totalPrice" SET NOT NULL;
