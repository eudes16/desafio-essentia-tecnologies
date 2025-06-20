-- AlterTable
ALTER TABLE `Todo` MODIFY `status` ENUM('pending', 'in_progress', 'completed', 'cancelled') NOT NULL DEFAULT 'pending';
