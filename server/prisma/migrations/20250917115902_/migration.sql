/*
  Warnings:

  - You are about to drop the column `stockIsMove` on the `total` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `jobcard` ADD COLUMN `stockIsMove` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `total` DROP COLUMN `stockIsMove`;
