
import { Prisma, Status} from "../generated/prisma/client.js";
import { prisma } from "../libs/prisma.js"



export const transactionRepository = {
    async create(data:Prisma.TransactionCreateInput, tx?:Prisma.TransactionClient){
        const db = tx || prisma
        return db.transaction.create({
          data:data  
        })
     }, 
    async listTransaction(){
        return prisma.transaction.findMany({})
     }, 
    async getidGroup(id:string){
        return prisma.transaction.findFirst({
          where:{
            transactionGruopID:id
          },select:{
            transactionGruopID:true
          }
        })
     }, 
    async deleteTransaction(id:string, tx?:Prisma.TransactionClient){
        const db = tx || prisma
        return db.transaction.deleteMany({
          where:{
             transactionGruopID:id
          },
        })
     }, 
    async deleteMany(tx?:Prisma.TransactionClient){
        const db = tx || prisma
        return db.transaction.deleteMany({
  
        })
     }, 
    async findGroupMany(idGroup:string){
        return prisma.transaction.findMany({
        where:{
          transactionGruopID:idGroup
        },
      select:{
        id:true
      }})
     },
    async findCategory(id:string){
        return prisma.transaction.findFirst({
        where:{
          categoryId:id
        },
      select:{
        categoryId:true
      }})
     },
   async updateStatus(id:string, status:Status){
        return prisma.transaction.update({
          where:{
            id:id
          },
          data:{
            status:status
          }
        })
   },
    async  findTransactionsbyDate(dateDay:Date, date7day:Date){
       return prisma.transaction.findMany({
        where:{
           dtVencimento:{
            gte:dateDay,
            lte:date7day
           },
           status: 'PENDENTE'
        },select:{
          name:true,
          dtVencimento:true,
          parcelaAtual:true,
          valorParcela:true,
          total:true,
          totalParcelas:true
        }
       })
    },
    
}