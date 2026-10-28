/*
  Warnings:

  - Added the required column `transactionGruopID` to the `Transitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transitions" ADD COLUMN     "transactionGruopID" VARCHAR(36) NOT NULL;
