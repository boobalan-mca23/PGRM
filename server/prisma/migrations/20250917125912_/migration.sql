/*
  Warnings:

  - Made the column `stockIsMove` on table `jobcard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `jobcard` MODIFY `stockIsMove` BOOLEAN NOT NULL DEFAULT false;
