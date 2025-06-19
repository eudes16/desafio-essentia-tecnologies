-- AlterTable
ALTER TABLE `Session` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `deletedAt` DATETIME(3) NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;
