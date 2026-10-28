
import AppError from "../error/AppError.js";
import type { Status } from "../generated/prisma/enums.js";
import { prisma } from "../libs/prisma.js";
import { categoryRepository } from "../repository/categoryRepository.js";
import { transactionRepository } from "../repository/transactionRepository.js";
import type { CreateTransactionDTO } from "../schemas/transactionSchemas.js";
import { addMonths } from "date-fns";
import {randomUUID} from "node:crypto"



const createTransaction = async (data:CreateTransactionDTO, user:string) =>{
   

    const result = prisma.$transaction(async (tx) => {
 const { categoryName, ...transactionData } = data;

    const category = await categoryRepository.findFirst(categoryName);

    let categoryId = category
      ? category.id
      : (await categoryRepository.create({ descrition: data.categoryName })).id;

    const newData = {
      ...transactionData,
      user: {
        connect: {
          id: user,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    };
    const uuidUnico = randomUUID()
    const createNewtransaction = [];
if(data.totalParcelas <= 0) throw new AppError('Parcela deve ser maior que 0', 400)
for (let i = 1; i <= data.totalParcelas; i++) {
      let dataValidade = new Date(data.dtVencimento);
      let valorParcela = data.total / data.totalParcelas;
      if (i > 1) {
        dataValidade = addMonths(dataValidade, i - 1);
      }
const newTransaction = await transactionRepository.create({
        ...newData,
        dtVencimento: dataValidade,
        parcelaAtual: i,
        valorParcela: valorParcela.toFixed(2),
        transactionGruopID: uuidUnico
      }, tx);
      createNewtransaction.push(newTransaction);
      return createNewtransaction
    }
    } )

    return result;
}




export const transactionService = {
  create: async (data: CreateTransactionDTO, user: string) => {
    const create = await createTransaction(data, user)
    return create
  },
  update: async (data: CreateTransactionDTO, user: string, idGroup:string) => {
     const findGroup = await  transactionRepository.findGroupMany(idGroup)
     if(!findGroup || findGroup.length == 0){
        throw new AppError('Não existe essa transaction', 404)
     }
     const result = await prisma.$transaction( async(tx) =>{
      const del = await transactionRepository.deleteTransaction(idGroup, tx)
      const create = await createTransaction(data, user)
      return {del,create}
     })
      return result.create
  },
  updateStatus: async (status: Status, id: string) => {
      const updateStatus = await transactionRepository.updateStatus(id, status)
      return updateStatus
  },
  listTransaction: async () => {
    return transactionRepository.listTransaction();
  },
  deleteAllTransaction: async () => {
    return transactionRepository.deleteMany();
  },
};
