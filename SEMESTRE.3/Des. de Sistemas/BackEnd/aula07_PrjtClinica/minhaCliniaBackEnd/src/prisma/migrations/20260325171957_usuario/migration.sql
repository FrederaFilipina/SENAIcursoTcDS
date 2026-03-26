/*
  Warnings:

  - You are about to drop the column `name` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT;
