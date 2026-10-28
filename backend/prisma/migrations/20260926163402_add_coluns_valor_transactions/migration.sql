-- CreateEnum
CREATE TYPE "Profile" AS ENUM ('MEMBER', 'ADMIN', 'FAMILYADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PAGO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "TipoConta" AS ENUM ('FAMILIAR', 'INDIVIDUAL');

-- CreateTable
CREATE TABLE "Users" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT,
    "profile" "Profile" NOT NULL DEFAULT 'MEMBER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transitions" (
    "id" VARCHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "valorParcela" DECIMAL(65,30) NOT NULL,
    "dtVencimento" TIMESTAMP(3) NOT NULL,
    "parcelaAtual" INTEGER NOT NULL DEFAULT 1,
    "totalParcelas" INTEGER NOT NULL,
    "tipoConta" "TipoConta" NOT NULL DEFAULT 'INDIVIDUAL',
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT "Transitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" VARCHAR(36) NOT NULL,
    "descrition" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_cpf_key" ON "Users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_descrition_key" ON "Categories"("descrition");

-- AddForeignKey
ALTER TABLE "Transitions" ADD CONSTRAINT "Transitions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transitions" ADD CONSTRAINT "Transitions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
