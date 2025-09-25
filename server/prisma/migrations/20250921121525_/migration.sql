-- CreateTable
CREATE TABLE `ExpenseTracker` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logId` INTEGER NULL,
    `weight` DOUBLE NULL,
    `touch` DOUBLE NULL,
    `purity` DOUBLE NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExpenseTracker` ADD CONSTRAINT `ExpenseTracker_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `RawGoldLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
