/*
  Warnings:

  - Added the required column `productId` to the `itemDelivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `itemdelivery` ADD COLUMN `productId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `itemDelivery` ADD CONSTRAINT `itemDelivery_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `MasterItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
