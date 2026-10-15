import {addMonths, setDate, startOfDay} from "date-fns"
import type { Request, Response } from "express"
export const healthController =  (req:Request, res:Response) => {

    const dataAtual = new Date("2026-11-15")

    let pagamento = new Date(dataAtual)
    
    if(dataAtual.getDate() > 10 ){
      const proximoMes = addMonths(dataAtual, 1)
      const diaDez = setDate(proximoMes, 10)
      pagamento = diaDez
    }else{
      pagamento = setDate(dataAtual, 10)
    }
    console.log((dataAtual))
    console.log(startOfDay(pagamento))

   return res.status(200).json({
    status:'Ok',
    message: 'Api funcionando',
    timestamp: new Date().toISOString()
   })

} 