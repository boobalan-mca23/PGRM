/*
  Warnings:

  - You are about to drop the column `currentHallmark` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `prevHallmark` on the `bill` table. All the data in the column will be lost.
  - You are about to drop the column `previousBalance` on the `bill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `bill` DROP COLUMN `currentHallmark`,
    DROP COLUMN `prevHallmark`,
    DROP COLUMN `previousBalance`;
