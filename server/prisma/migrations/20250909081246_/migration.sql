-- AlterTable
ALTER TABLE `itemdelivery` ADD COLUMN `productLogID` INTEGER NULL;

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

-- AddForeignKey
ALTER TABLE `itemDelivery` ADD CONSTRAINT `itemDelivery_productLogID_fkey` FOREIGN KEY (`productLogID`) REFERENCES `ProductStockLog`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
