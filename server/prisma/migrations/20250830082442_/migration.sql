-- CreateTable
CREATE TABLE `Bill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `billAmount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItems` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `billId` INTEGER NOT NULL,
    `productName` VARCHAR(191) NOT NULL,
    `weight` DOUBLE NULL,
    `stoneWeight` DOUBLE NULL,
    `afterWeight` DOUBLE NULL,
    `percentage` DOUBLE NULL,
    `finalWeight` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `billReceived` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `billId` INTEGER NOT NULL,
    `goldRate` INTEGER NULL,
    `gold` DOUBLE NULL,
    `touch` DOUBLE NULL,
    `purity` DOUBLE NULL,
    `amount` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bill` ADD CONSTRAINT `Bill_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `billReceived` ADD CONSTRAINT `billReceived_billId_fkey` FOREIGN KEY (`billId`) REFERENCES `Bill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
