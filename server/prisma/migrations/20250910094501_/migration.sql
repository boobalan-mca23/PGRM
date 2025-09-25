/*
  Warnings:

  - You are about to drop the column `productStockdedId` on the `deduction` table. All the data in the column will be lost.
  - You are about to drop the column `productlogID` on the `itemdelivery` table. All the data in the column will be lost.
  - You are about to drop the `_productstockdedlogtodeduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productstockdedlog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `productstocklog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_productstockdedlogtodeduction` DROP FOREIGN KEY `_ProductStockdedLogTodeduction_A_fkey`;

-- DropForeignKey
ALTER TABLE `_productstockdedlogtodeduction` DROP FOREIGN KEY `_ProductStockdedLogTodeduction_B_fkey`;

-- DropForeignKey
ALTER TABLE `itemdelivery` DROP FOREIGN KEY `itemDelivery_productlogID_fkey`;

-- DropForeignKey
ALTER TABLE `productstockdedlog` DROP FOREIGN KEY `ProductStockdedLog_productlogID_fkey`;

-- DropIndex
DROP INDEX `itemDelivery_productlogID_fkey` ON `itemdelivery`;

-- AlterTable
ALTER TABLE `deduction` DROP COLUMN `productStockdedId`;

-- AlterTable
ALTER TABLE `itemdelivery` DROP COLUMN `productlogID`;

-- AlterTable
ALTER TABLE `rawgoldstock` ADD COLUMN `remainingWt` DOUBLE NULL;

-- DropTable
DROP TABLE `_productstockdedlogtodeduction`;

-- DropTable
DROP TABLE `productstockdedlog`;

-- DropTable
DROP TABLE `productstocklog`;
