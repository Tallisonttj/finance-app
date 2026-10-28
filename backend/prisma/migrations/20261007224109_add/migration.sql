-- CreateTable
CREATE TABLE "Tasks" (
    "id" VARCHAR(36) NOT NULL,
    "descrition" TEXT NOT NULL,
    "valor" DECIMAL(10,2),
    "dtProxima" TIMESTAMP(3) NOT NULL,
    "dtUltima" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_descrition_key" ON "Tasks"("descrition");
