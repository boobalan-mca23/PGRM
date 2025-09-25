-- CreateTable
CREATE TABLE `ProductStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobcardId` INTEGER NOT NULL,
    `itemName` VARCHAR(191) NOT NULL,
    `itemWeight` DOUBLE NOT NULL,
    `touch` DOUBLE NOT NULL,
    `stoneWeight` DOUBLE NOT NULL,
    `wastageValue` DOUBLE NOT NULL,
    `FinalWeight` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductStock` ADD CONSTRAINT `ProductStock_jobcardId_fkey` FOREIGN KEY (`jobcardId`) REFERENCES `Jobcard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
