import type { Request, Response } from "express"
export const healthController = async (req:Request, res:Response) => {

   return res.status(201).json({
    status:'Ok',
    menssage: 'Api funcionando',
    timestamp: new Date()
   })

} 