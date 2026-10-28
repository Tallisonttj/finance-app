/*
  Warnings:

  - Added the required column `responsavelDivida` to the `Transitions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Transitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transitions" ADD COLUMN     "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "responsavelDivida" TEXT NOT NULL,
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
