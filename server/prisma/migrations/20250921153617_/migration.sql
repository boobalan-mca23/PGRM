/*
  Warnings:

  - You are about to drop the column `weight` on the `expensetracker` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `expensetracker` DROP COLUMN `weight`,
    ADD COLUMN `gold` DOUBLE NULL;
