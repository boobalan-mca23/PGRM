-- CreateTable
CREATE TABLE `customerBillBalance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` DOUBLE NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `customerBillBalance` ADD CONSTRAINT `customerBillBalance_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
