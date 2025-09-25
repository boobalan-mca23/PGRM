-- AlterTable
ALTER TABLE `givengold` ADD COLUMN `logId` INTEGER NULL;

-- AlterTable
ALTER TABLE `receivedsection` ADD COLUMN `logId` INTEGER NULL;

-- CreateTable
CREATE TABLE `RawgoldStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `touchId` INTEGER NOT NULL,
    `weight` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RawGoldLogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rawGoldStockId` INTEGER NOT NULL,
    `weight` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `givenGold` ADD CONSTRAINT `givenGold_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `RawGoldLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receivedsection` ADD CONSTRAINT `Receivedsection_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `RawGoldLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RawgoldStock` ADD CONSTRAINT `RawgoldStock_touchId_fkey` FOREIGN KEY (`touchId`) REFERENCES `MasterTouch`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RawGoldLogs` ADD CONSTRAINT `RawGoldLogs_rawGoldStockId_fkey` FOREIGN KEY (`rawGoldStockId`) REFERENCES `RawgoldStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
