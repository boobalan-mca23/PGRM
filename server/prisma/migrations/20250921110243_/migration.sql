/*
  Warnings:

  - You are about to drop the column `value` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `value`,
    ADD COLUMN `amount` DOUBLE NULL,
    ADD COLUMN `gold` DOUBLE NULL;
