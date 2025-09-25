/*
  Warnings:

  - You are about to drop the column `productLogID` on the `itemdelivery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemdelivery` DROP FOREIGN KEY `itemDelivery_productLogID_fkey`;

-- DropIndex
DROP INDEX `itemDelivery_productLogID_fkey` ON `itemdelivery`;

-- AlterTable
ALTER TABLE `itemdelivery` DROP COLUMN `productLogID`,
    ADD COLUMN `productlogID` INTEGER NULL;

-- CreateTable
CREATE TABLE `ProductStockdedLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productlogID` INTEGER NULL,
    `type` VARCHAR(191) NULL,
    `weight` DOUBLE NULL,
    `stoneWt` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itemDelivery` ADD CONSTRAINT `itemDelivery_productlogID_fkey` FOREIGN KEY (`productlogID`) REFERENCES `ProductStockLog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStockdedLog` ADD CONSTRAINT `ProductStockdedLog_productlogID_fkey` FOREIGN KEY (`productlogID`) REFERENCES `ProductStockLog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
