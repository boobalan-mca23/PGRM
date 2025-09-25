/*
  Warnings:

  - You are about to drop the column `productId` on the `itemdelivery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `itemdelivery` DROP FOREIGN KEY `itemDelivery_productId_fkey`;

-- DropIndex
DROP INDEX `itemDelivery_productId_fkey` ON `itemdelivery`;

-- AlterTable
ALTER TABLE `itemdelivery` DROP COLUMN `productId`;
