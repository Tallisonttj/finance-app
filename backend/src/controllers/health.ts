import "dotenv/config";
import type { Request, Response } from "express"
export const healthController = async (req:Request, res:Response) => {

   const hoje = new Date()
    hoje.setHours(0, 0, 0)
    
    const date7days = new Date(hoje)
    date7days.setDate(hoje.getDate() + 1) 
    const teste = `${'TESTEDD'}`
   
   return res.status(200).json({
    status:'Ok',
    message: 'Api funcionando',
    teste: teste,
    timestamp: new Date().toISOString()
   })

} 