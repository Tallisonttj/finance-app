import type { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../libs/prisma.js";



export const taskHistoryRepository = {
    async create(data:Prisma.TaskExecuteCreateInput, tx?:Prisma.TransactionClient){
        const db = tx || prisma
        return  db.taskExecute.create({data})
    },
    async deleteHistoryTask(){
        return prisma.taskExecute.deleteMany()
    },
    async listHistoryTask(){
       return prisma.taskExecute.findMany({})
    },
  
   
}