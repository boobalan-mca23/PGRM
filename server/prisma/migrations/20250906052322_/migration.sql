-- CreateTable
CREATE TABLE `receiptVoucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `logId` INTEGER NULL,
    `date` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,
    `goldRate` INTEGER NULL,
    `gold` DOUBLE NULL,
    `touch` DOUBLE NULL,
    `purity` DOUBLE NULL,
    `receiveHallMark` DOUBLE NULL,
    `amount` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `receiptVoucher` ADD CONSTRAINT `receiptVoucher_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receiptVoucher` ADD CONSTRAINT `receiptVoucher_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `RawGoldLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
