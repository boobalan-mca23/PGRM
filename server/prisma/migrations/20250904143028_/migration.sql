/*
  Warnings:

  - Added the required column `billId` to the `billReceived` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `billreceived` ADD COLUMN `billId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `billReceived` ADD CONSTRAINT `billReceived_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
