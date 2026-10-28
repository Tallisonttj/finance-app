
import { taskHistoryRepository } from "../repository/taskHistoryRepository.js";


export const taskHistoryService = {

   HistoryTakslist: async () => {
     const list = await taskHistoryRepository.listHistoryTask()
     if(list.length === 0){
      return 'Não tem nenhuma task no banco'
     }
     return list
  },
   HistoryTaksDelete: async () => {
     const deleteHistoryTask = await taskHistoryRepository.deleteHistoryTask()
     return deleteHistoryTask
  },
  findHistoryTaskbyDate: async () => {
    const find = ''
  }
};
