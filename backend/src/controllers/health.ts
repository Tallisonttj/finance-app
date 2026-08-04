import type { Request, Response } from "express"
export const healthController =  (req:Request, res:Response) => {

   return res.status(200).json({
    status:'Ok',
    message: 'Api funcionando',
    timestamp: new Date().toISOString()
   })

} 