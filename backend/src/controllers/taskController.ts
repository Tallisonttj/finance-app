import type { Request, Response } from "express";
import { taskSchema } from "../schemas/taskSchemas.js";
import { taskService } from "../services/taskService.js";
import AppError from "../error/AppError.js";
import { Prisma } from "../generated/prisma/client.js";
;



export const taskController = {

  createTask: async (req: Request, res: Response )=> {
    try {
      const body = taskSchema.parse(req.body);
      const userId = req.user?.id
      if(userId){
         const task = await taskService.createTask(body, userId);
      res.status(201).json({
        task,
      });
      }
    } catch (error:unknown) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        let errorMsg = error.code === 'P2002' ? 'Descrição ja existe no banco':`Outro erro ${error.message, error.code}`
        throw new AppError(errorMsg, 409) 
      }
      if(error instanceof Error){
        throw new AppError(error.message, 400) 
      }
      else{
        console.error('Erro desconhecido', error)
      }
      
    }
   
  },
  completedTask: async (req: Request, res: Response )=> {
      const {id} = req.params
      const userId = req.user?.id
      console.log(id)
      if(userId){
         const taskCompleted = await taskService.completedTask(id as string) ;
      res.status(201).json(
        taskCompleted
      );
      }
  },
  listTask: async (req: Request, res: Response )=> {
     const tasklist = await taskService.listTask() ;
      res.status(201).json(
        tasklist
      );  
  },deleteTask: async (req: Request, res: Response )=> {
     const tasklist = await taskService.taskDelete() ;
      res.status(201).json(
        tasklist
      );  
  }
}
  
