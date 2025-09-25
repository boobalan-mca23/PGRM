-- AlterTable
ALTER TABLE `billreceived` ADD COLUMN `receiveHallMark` DOUBLE NULL;

-- AlterTable
ALTER TABLE `customerbillbalance` ADD COLUMN `hallMarkBal` DOUBLE NULL,
    MODIFY `balance` DOUBLE NULL;
