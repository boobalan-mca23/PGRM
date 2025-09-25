-- AlterTable
ALTER TABLE `bill` ADD COLUMN `PrevBalance` DOUBLE NULL,
    ADD COLUMN `Stoneprofit` DOUBLE NULL,
    ADD COLUMN `Totalprofit` DOUBLE NULL,
    ADD COLUMN `billDetailsprofit` DOUBLE NULL,
    ADD COLUMN `cashBalance` DOUBLE NULL,
    ADD COLUMN `prevHallMark` DOUBLE NULL;

-- AlterTable
ALTER TABLE `orderitems` ADD COLUMN `count` INTEGER NULL;
