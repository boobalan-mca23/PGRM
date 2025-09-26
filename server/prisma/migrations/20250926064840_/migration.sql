/*
  Warnings:

  - Added the required column `remainCopper` to the `mastercopper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mastercopper` ADD COLUMN `remainCopper` DOUBLE NOT NULL;
