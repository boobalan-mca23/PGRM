-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `logId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `RawGoldLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
