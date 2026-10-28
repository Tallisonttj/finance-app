import { startOfDay } from "date-fns";

type listDespesas = {
  name: string;
  total: number;
  parcelaAtual: number;
  totalParcelas: number;
  valorParcela: number;
  dataVencimento: Date;
};

export const avisoTransaction = ({
  name,
  total,
  parcelaAtual,
  totalParcelas,
  valorParcela,
  dataVencimento,
}: listDespesas) => {
  let real = (n: number) => {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      currencyDisplay: "symbol",
    }).format(n);
  };
  let listDespesas = `
      <div style="font-family:'Arial'; sans-serif; font-size:14px">
        <span style="font-weight:bold">Despesa: </span> ${name}<br>
        <span style="font-weight:bold">Valor Total: </span>${real(total)}<br>
       <span style="font-weight:bold">Parcela: </span>${parcelaAtual} de ${totalParcelas}<br>
        <span style="font-weight:bold">Valor Parcela: </span>${real(valorParcela)}<br>
         <span style="font-weight:bold">Vencimento: </span>${dataVencimento.toLocaleDateString(
           "pt-BR",
           {
             timeZone: "UTC",
           },
         )}<br>
      </div><hr><br> 
       `;
  return listDespesas;
};

export const is7Days = (bodyMsg: string[], qtd: number) => {
  let message = `<div style="font-family:'Arial'; sans-serif; font-size:14px; font-weight:bold ">
    <p>
    Olá! Passamos para lembrar que você possui ${qtd == 1 ? `${qtd} despesa` : `${qtd} despesas`} com vencimento para daqui a 7 dias.
    </p>
    </div>
    <div>
     ${bodyMsg.join("")}
    </div>

           
          
           
        `;
  return message;
};
export const is2Days = (bodyMsg: string[], qtd: number) => {
  let message = `<div style="font-family:'Arial'; sans-serif; font-size:14px; font-weight:bold ">
    <p>
    Olá! Passamos para lembrar que você possui ${qtd == 1 ? `${qtd} despesa` : `${qtd} despesas`} com vencimento para daqui a 2 dias.
    </p>
    </div>
    <div>
     ${bodyMsg.join("")}
    </div>
        `;
  return message;
};


export const hasTomorrow = (bodyMsg: string[], qtd: number) => {
  let message = `<div style="font-family:'Arial'; sans-serif; font-size:14px; font-weight:bold" >
    <p>
    Olá! Passamos para lembrar que você possui ${qtd == 1 ? `${qtd} despesa` : `${qtd} despesas`} com vencimento para Amanhã!.
    </p>
    </div>
    <div>
     ${bodyMsg.join("")}
    </div>`;
  return message;
};
export const hasToday = (bodyMsg: string[], qtd: number) => {
  let message = `<div style="font-family:'Arial'; sans-serif; font-size:14px; font-weight:bold ">
    <p>
    Olá! Passamos para lembrar que você possui ${qtd == 1 ? `${qtd} despesa` : `${qtd} despesas`} com vencimento para Hoje!.
    </p>
    </div>
    <div>
     ${bodyMsg.join("")}
    </div>
    
   `;
  return message;
};