-- AlterTable
ALTER TABLE `billreceived` ADD COLUMN `logId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `billReceived` ADD CONSTRAINT `billReceived_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `RawGoldLogs`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
