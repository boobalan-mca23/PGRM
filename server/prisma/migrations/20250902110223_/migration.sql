/*
  Warnings:

  - You are about to drop the column `billId` on the `billreceived` table. All the data in the column will be lost.
  - Added the required column `customer_id` to the `billReceived` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `billreceived` DROP FOREIGN KEY `billReceived_billId_fkey`;

-- DropIndex
DROP INDEX `billReceived_billId_fkey` ON `billreceived`;

-- AlterTable
ALTER TABLE `billreceived` DROP COLUMN `billId`,
    ADD COLUMN `customer_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `billReceived` ADD CONSTRAINT `billReceived_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
