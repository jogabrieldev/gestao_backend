/*
  Warnings:

  - The primary key for the `client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `client` table. All the data in the column will be lost.
  - The primary key for the `fornecedor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `fornecedor` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `fornecedor` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_nasc` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_client` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_forne` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_empresa` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Fornecedor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `cpf` VARCHAR(191) NOT NULL,
    ADD COLUMN `data_nasc` DATETIME(3) NOT NULL,
    ADD COLUMN `id_client` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_client`);

-- AlterTable
ALTER TABLE `fornecedor` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    ADD COLUMN `id_forne` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name_empresa` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id_forne`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_user`);

-- CreateIndex
CREATE UNIQUE INDEX `Client_userId_email_key` ON `Client`(`userId`, `email`);
CREATE UNIQUE INDEX `Client_userId_cpf_key` ON `Client`(`userId`, `cpf`);
CREATE UNIQUE INDEX `Client_userId_phone_key` ON `Client`(`userId`, `phone`);
CREATE INDEX `Client_userId_createdAt_idx` ON `Client`(`userId`, `createdAt`);
CREATE UNIQUE INDEX `Fornecedor_userId_cnpj_key` ON `Fornecedor`(`userId`, `cnpj`);
CREATE UNIQUE INDEX `Fornecedor_userId_email_key` ON `Fornecedor`(`userId`, `email`);
CREATE UNIQUE INDEX `Fornecedor_userId_phone_key` ON `Fornecedor`(`userId`, `phone`);
CREATE INDEX `Fornecedor_userId_createdAt_idx` ON `Fornecedor`(`userId`, `createdAt`);

-- AddForeignKey
ALTER TABLE `Client` ADD CONSTRAINT `Client_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fornecedor` ADD CONSTRAINT `Fornecedor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;
