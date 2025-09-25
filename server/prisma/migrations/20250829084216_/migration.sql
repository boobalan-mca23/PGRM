/*
  Warnings:

  - You are about to drop the column `FinalWeight` on the `productstock` table. All the data in the column will be lost.
  - Added the required column `finalWeight` to the `ProductStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productstock` DROP COLUMN `FinalWeight`,
    ADD COLUMN `finalWeight` DOUBLE NOT NULL;
