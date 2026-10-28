import AppError from "../error/AppError.js";
import { prisma } from "../libs/prisma.js";
import { taskHistoryRepository } from "../repository/taskHistoryRepository.js";
import { taskRepository } from "../repository/taskRepository.js";
import type { CreateTaskDTO } from "../schemas/taskSchemas.js";
import { transactionRepository } from "../repository/transactionRepository.js";
import { randomUUID } from "node:crypto";
import {
  addDays,
  addMonths,
  nextThursday,
  previousThursday,
  setDate,
  startOfDay,
} from "date-fns";

export const taskService = {
  createTask: async (payload: CreateTaskDTO, userid: string) => {
    const { categoryId, ...data } = payload;
    const newData = {
      ...data,
      valor: payload.valor ?? null,
      user: {
        connect: {
          id: userid,
        },
      },
      category: {
        connect: {
          id: payload.categoryId,
        },
      },
    };
    const result = await taskRepository.create(newData);
    return result;
  },
  completedTask: async (id: string) => {
    const hasTask = await taskRepository.findId(id);
    if (!hasTask) {
      throw new AppError("Não existe essa Taks", 404);
    }
    const result = prisma.$transaction(async (tx) => {
      const createNewtransaction = [];

      if (hasTask.valor !== null) {
        const uuidUnico = randomUUID();
        let dtProxima = hasTask.dtProxima
        let pagamento = new Date(dtProxima)
       if(dtProxima.getDate() > 10 ){
             const proximoMes = addMonths(dtProxima, 1)
             const diaDez = setDate(proximoMes, 10)
             pagamento = diaDez
           }else{
             pagamento = setDate(dtProxima, 10)
           }
           
        const newTransaction = await transactionRepository.create(
          {
            name: hasTask.descrition,
            total: hasTask.valor,
            dtVencimento: startOfDay(pagamento),
            totalParcelas: 1,
            parcelaAtual: 1,
            responsavelDivida: "ADMIN",
            status: "PENDENTE",
            tipoConta: "FAMILIAR",
            transactionGruopID: uuidUnico,
            valorParcela: hasTask.valor,
            user: {
              connect: {
                id: hasTask.userId,
              },
            },
            category: {
              connect: {
                id: hasTask.categoryId,
              },
            },
          },
          tx,
        );
        createNewtransaction.push(newTransaction);
      }
      const taskHistory = await taskHistoryRepository.create(
        {
          valor: hasTask.valor ?? null,
          taskEx: {
            connect: {
              id: hasTask.id,
            },
          },
          executeAt: hasTask.dtProxima,
          ...(createNewtransaction && {
            transaction: {
              connect: {
                id: createNewtransaction[0]?.id as string,
              },
            },
          }),
        },
        tx,
      );

      const startDay = startOfDay(new Date(hasTask.dtProxima));
      const newdate = addDays(startDay, hasTask.interval);
      let quinta = newdate;
      const isThursday = newdate.getDay();

      if (isThursday === 4) {
      } else if (isThursday < 4) {
        quinta = nextThursday(newdate);
      }
      if (isThursday > 4) {
        quinta = previousThursday(newdate);
      }

      const update = await taskRepository.update(id, hasTask.dtProxima, quinta);
      return { taskHistory, createNewtransaction, update };
    });
    return result;
  },
  listTask: async () => {
    const list = await taskRepository.takslist();
    return list;
  },
  taskDelete: async () => {
    const deleteTask = await taskRepository.deleteTask();
    return deleteTask;
  },
};
