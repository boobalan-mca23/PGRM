-- AlterTable
ALTER TABLE `deduction` ADD COLUMN `productStockdedId` INTEGER NULL;

-- CreateTable
CREATE TABLE `_ProductStockdedLogTodeduction` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProductStockdedLogTodeduction_AB_unique`(`A`, `B`),
    INDEX `_ProductStockdedLogTodeduction_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProductStockdedLogTodeduction` ADD CONSTRAINT `_ProductStockdedLogTodeduction_A_fkey` FOREIGN KEY (`A`) REFERENCES `ProductStockdedLog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProductStockdedLogTodeduction` ADD CONSTRAINT `_ProductStockdedLogTodeduction_B_fkey` FOREIGN KEY (`B`) REFERENCES `deduction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
