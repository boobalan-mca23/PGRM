/*
  Warnings:

  - You are about to drop the column `remainingWt` on the `rawgoldstock` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `billreceived` DROP FOREIGN KEY `billReceived_billId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitems` DROP FOREIGN KEY `OrderItems_billId_fkey`;

-- DropIndex
DROP INDEX `billReceived_billId_fkey` ON `billreceived`;

-- DropIndex
DROP INDEX `OrderItems_billId_fkey` ON `orderitems`;

-- AlterTable
ALTER TABLE `bill` ADD COLUMN `currentHallmark` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `date` DATETIME(3) NULL,
    ADD COLUMN `prevHallmark` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `previousBalance` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `time` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `billreceived` MODIFY `billId` INTEGER NULL;

-- AlterTable
ALTER TABLE `deduction` ADD COLUMN `productStockdedId` INTEGER NULL;

-- AlterTable
ALTER TABLE `itemdelivery` ADD COLUMN `productlogID` INTEGER NULL;

-- AlterTable
ALTER TABLE `rawgoldstock` DROP COLUMN `remainingWt`;

-- CreateTable
CREATE TABLE `ProductStockLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemName` VARCHAR(191) NULL,
    `itemWeight` DOUBLE NULL,
    `count` INTEGER NULL,
    `touch` DOUBLE NULL,
    `sealName` VARCHAR(191) NULL,
    `netWeight` DOUBLE NULL,
    `wastageType` VARCHAR(191) NULL,
    `wastageValue` DOUBLE NULL,
    `wastagePure` DOUBLE NULL,
    `finalPurity` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `_ProductStockdedLogTodeduction` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductStockdedLogTodeduction_AB_unique`(`A`, `B`),
    INDEX `_ProductStockdedLogTodeduction_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itemDelivery` ADD CONSTRAINT `itemDelivery_productlogID_fkey` FOREIGN KEY (`productlogID`) REFERENCES `ProductStockLog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductStockdedLog` ADD CONSTRAINT `ProductStockdedLog_productlogID_fkey` FOREIGN KEY (`productlogID`) REFERENCES `ProductStockLog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `billReceived` ADD CONSTRAINT `billReceived_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductStockdedLogTodeduction` ADD CONSTRAINT `_ProductStockdedLogTodeduction_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductStockdedLog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductStockdedLogTodeduction` ADD CONSTRAINT `_ProductStockdedLogTodeduction_B_fkey` FOREIGN KEY (`B`) REFERENCES `deduction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
