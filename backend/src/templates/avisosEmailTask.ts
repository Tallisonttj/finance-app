import { startOfDay } from "date-fns";

type taskType = {
  descrition: string;
  dtProxima: Date;
};

export const is2DaysTask = ({ descrition, dtProxima }: taskType) => {
  let message = `<div style="font-family:'Arial'; sans-serif; font-size:14px">
  
    <p>Olá! Passamos para lembrar que você possui ${descrition} marcada para daqui a 2 dias.</p> <br>
           
         <p><span style="font-weight:bold">Data da proxima faxina</span> ${dtProxima.toLocaleDateString(
             "pt-BR",
             {
               timeZone: "UTC",
             },
           )}</p><div/>
        `;
  return message;
};

export const hasTodayTask = ({ descrition, dtProxima }: taskType): string => {
  let message = `<div style="font-family:'Arial'; sans-serif; font-size:14px">
  
    <p>Olá! Passamos para lembrar que você possui ${descrition} marcada para Hoje! </p> <br/>
           
           <p><span style="font-weight:bold">Data da proxima faxina</span> ${dtProxima.toLocaleDateString(
             "pt-BR",
             {
               timeZone: "UTC",
             },
           )}</p><div/>
        `;

  return message;
};
