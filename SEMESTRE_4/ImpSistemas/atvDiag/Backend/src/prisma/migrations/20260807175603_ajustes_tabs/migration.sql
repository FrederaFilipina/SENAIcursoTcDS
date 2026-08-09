/*
  Warnings:

  - Made the column `bairro` on table `Cliente` required. This step will fail if there are existing NULL values in that column.
  - Made the column `observacoes` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cliente" ALTER COLUMN "bairro" SET NOT NULL,
ALTER COLUMN "observacoes" SET NOT NULL;
