import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../libs/prisma.js";



export const taskRepository = {
    async create(data:Prisma.TaskCreateInput, tx?:Prisma.TransactionClient){
        const db = tx || prisma
        return db.task.create({data})
    },
    async findId(id:string){
        return prisma.task.findFirst({
            where:{
                id:id
            }
        })
    },
    async update(id:string, dtUltima:Date, dtProxima:Date, tx?:Prisma.TransactionClient){
        const db = tx || prisma
        return db.task.update({
            where:{
                id:id
            },
            data:{
                dtUltima:dtUltima,
                dtProxima:dtProxima
            }
        })
    },
    async deleteTask(){
        return prisma.task.deleteMany()
    },
    async takslist(){
        return prisma.task.findMany()
    },
     async  findTaskbyDate(dateInit:Date, datefinish:Date){
       return prisma.task.findMany({
        where:{
           dtProxima:{
            gte:dateInit,
            lte:datefinish
           },
        },select:{
            descrition:true,
            dtProxima:true
        }
       })
    },
}