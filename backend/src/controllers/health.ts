import {addMonths, setDate, startOfDay} from "date-fns"
import type { Request, Response } from "express"
import { taskRepository } from "../repository/taskRepository.js"

import { transactionRepository } from "../repository/transactionRepository.js"
import { da } from "zod/v4/locales"
export const healthController = async (req:Request, res:Response) => {

   const hoje = new Date()
    hoje.setHours(0, 0, 0)
    
    const date7days = new Date(hoje)
    date7days.setDate(hoje.getDate() + 1) 
    const teste = new Date(date7days)
   
   return res.status(200).json({
    status:'Ok',
    message: 'Api funcionando',
    teste: teste,
    timestamp: new Date().toISOString()
   })

} 