import type { Request, Response } from "express";
import { createTransaction } from "../schemas/transactionSchemas.js";
import { transactionService } from "../services/transactionService.js";
import AppError from "../error/AppError.js";
import { transactionRepository } from "../repository/transactionRepository.js";



export const transactionController = {

  createTransaction: async (req: Request, res: Response )=> {
    
      const body = createTransaction.parse(req.body);
      const userId = req.user?.id
      if(userId){
         const transaction = await transactionService.create(body, userId);
        res.status(201).json({
        transaction,
      })
      }
    

  },
  updateTransaction: async (req: Request, res: Response )=> {
    
      const body = createTransaction.parse(req.body);
      const {id} = req.params
      const userId = req.user?.id
      console.log(id)
      if(userId){
      const updateTransaction = await transactionService.update(body, userId, id as string);
      res.status(201).json(
        updateTransaction,
      );
      }
    

  },
  updateSatus: async (req: Request, res: Response) => {
      const {id} = req.params
      const {status} = req.body
      const updateStatus = await transactionRepository.updateStatus(id as string, status)
      return res.status(201).json({
         updateStatus
      })
    },
  listTransaction: async (req: Request, res: Response) => {
      const list = await transactionService.listTransaction()
      return res.status(201).json({
        list: list
      })
    },
  delete: async (req: Request, res: Response) => {
      const {id} = req.params
      console.log(id)
      const del = await transactionRepository.deleteTransaction(id as string)
      return res.status(201).json({
        del: del
      })
    },
 
  deleteMany: async (req: Request, res: Response) => {
      const del = await transactionRepository.deleteMany()
      return res.status(201).json({
        del: del
      })
    },
 }
 
;

