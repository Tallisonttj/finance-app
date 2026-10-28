import type { Request, Response } from "express";
import { taskHistoryService } from "../services/taskHistoryService.js";
;



export const taskHistoryController = {

  listTaskHistory: async (req: Request, res: Response )=> {
     const tasklistHistory = await taskHistoryService.HistoryTakslist() ;
      res.status(201).json(
        tasklistHistory
      );  
  }
  ,
  deleteTaskHistory: async (req: Request, res: Response )=> {
     const taskDeleteHistory = await taskHistoryService.HistoryTaksDelete() ;
      res.status(201).json(
        taskDeleteHistory
      );  
  }
}
  
