-- CreateTable
CREATE TABLE "TaskExecutions" (
    "id" SERIAL NOT NULL,
    "taskId" TEXT NOT NULL,
    "valor" DECIMAL(10,2),
    "executeAt" TIMESTAMP(3) NOT NULL,
    "transactionId" TEXT,

    CONSTRAINT "TaskExecutions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskExecutions" ADD CONSTRAINT "TaskExecutions_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskExecutions" ADD CONSTRAINT "TaskExecutions_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transitions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
