/*
  Warnings:

  - Added the required column `count` to the `ProductStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productstock` ADD COLUMN `count` INTEGER NOT NULL;
