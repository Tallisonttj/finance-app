import cron from "node-cron";
import nodemailer from "nodemailer";
import { transactionRepository } from "../repository/transactionRepository.js";
import {
  avisoTransaction,
  hasToday,
  hasTomorrow,
  is2Days,
  is7Days,
} from "../templates/avisosEmail.js";
import { differenceInCalendarDays, parseISO, startOfDay } from "date-fns";
import { taskRepository } from "../repository/taskRepository.js";
import { hasTodayTask, is2DaysTask } from "../templates/avisosEmailTask.js";
import { setTimeout } from "node:timers/promises";

let testAccount = await nodemailer.createTestAccount();

let transport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure:false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

const recipients = ["tallisontadeu_037@hotmail.com"];

const delayEmail = (ms: number) => setTimeout(ms);

export const sendEmailTransaction = async () => {
  const hoje = startOfDay(new Date());
  let BuscarHoje = new Date(hoje);
  BuscarHoje.setHours(BuscarHoje.getHours() - 3);
  const date7days = new Date(hoje);
  date7days.setDate(hoje.getDate() + 7);

  let pegarTransactions = await transactionRepository.findTransactionsbyDate(
    BuscarHoje,
    date7days,
  );

  let message = "";

  const email = async (message: string) => {
    try {
      const info = await transport.sendMail({
        from: '"Alerta fatura" <fatura@alerta.com.br>',
        to: recipients,
        subject: "ALERTA DE FATURA",
        html: message,
        text: message,
      });
       console.log("Message sent: %s", info.messageId);
       console.log('url de visualização', nodemailer.getTestMessageUrl(info))
    } catch (error) {
      return console.log(error);
    }
  };
  let corvertDate = (date: Date) => date.toISOString().split("T")[0] as string;

  const transactions7days = pegarTransactions.filter(
    (i) =>
      differenceInCalendarDays(
        startOfDay(parseISO(corvertDate(i.dtVencimento))),
        hoje,
      ) == 7,
  );
  if (transactions7days.length > 0) {
    let bodyMsg = transactions7days.map((i) =>
      avisoTransaction({
        name: i.name,
        total: i.total.toNumber(),
        parcelaAtual: i.parcelaAtual,
        totalParcelas: i.totalParcelas,
        valorParcela: i.valorParcela.toNumber(),
        dataVencimento: i.dtVencimento,
      }),
    );
    message = is7Days(bodyMsg, bodyMsg.length);
    await email(message);
    await delayEmail(1100);
  }
  const transactions2days = pegarTransactions.filter(
    (i) =>
      differenceInCalendarDays(
        startOfDay(parseISO(corvertDate(i.dtVencimento))),
        hoje,
      ) == 2,
  );
  if (transactions2days.length > 0) {
    let bodyMsg = transactions2days.map((i) =>
      avisoTransaction({
        name: i.name,
        total: i.total.toNumber(),
        parcelaAtual: i.parcelaAtual,
        totalParcelas: i.totalParcelas,
        valorParcela: i.valorParcela.toNumber(),
        dataVencimento: i.dtVencimento,
      }),
    );
    message = is2Days(bodyMsg, bodyMsg.length);
    await email(message);
    await delayEmail(1100);
  }
  const transactions1Day = pegarTransactions.filter(
    (i) =>
      differenceInCalendarDays(
        startOfDay(parseISO(corvertDate(i.dtVencimento))),
        hoje,
      ) == 1,
  );

  if (transactions1Day.length > 0) {
    let bodyMsg = transactions1Day.map((i) =>
      avisoTransaction({
        name: i.name,
        total: i.total.toNumber(),
        parcelaAtual: i.parcelaAtual,
        totalParcelas: i.totalParcelas,
        valorParcela: i.valorParcela.toNumber(),
        dataVencimento: i.dtVencimento,
      }),
    );
    message = hasTomorrow(bodyMsg, bodyMsg.length);
    await email(message);
    await delayEmail(1100);
  }
  const transactionsToday = pegarTransactions.filter(
    (i) =>
      differenceInCalendarDays(
        startOfDay(parseISO(corvertDate(i.dtVencimento))),
        hoje,
      ) === 0,
  );
  if (transactionsToday.length > 0) {
    let bodyMsg = transactionsToday.map((i) =>
      avisoTransaction({
        name: i.name,
        total: i.total.toNumber(),
        parcelaAtual: i.parcelaAtual,
        totalParcelas: i.totalParcelas,
        valorParcela: i.valorParcela.toNumber(),
        dataVencimento: i.dtVencimento,
      }),
    );
    message = hasToday(bodyMsg, bodyMsg.length);
    await email(message);
    await delayEmail(1100);
  }
};

export const sendEmailTask = async () => {
  const hoje = startOfDay(new Date());
  let BuscarHoje = new Date(hoje);
  BuscarHoje.setHours(BuscarHoje.getHours() - 3);
  const date2days = new Date(hoje);
  date2days.setDate(hoje.getDate() + 2);

  let pegarTask = await taskRepository.findTaskbyDate(BuscarHoje, date2days);
  

  let message= "";
    const email = async (message: string) => {
    try {
      const info = await transport.sendMail({
        from: '"Lembrete Faxina" <lembrete@faxina.com',
        to: recipients,
        subject: "LEMBRETE DE FAXINA",
        html: message,
        text: message,
      });
      console.log("Message sent: %s", info.messageId);
      console.log('url de visualização', nodemailer.getTestMessageUrl(info))
    } catch (error) {
      return console.log(error);
    }
  };

  let corvertDate = (date: Date) => date.toISOString().split("T")[0] as string;
  const taskToday = pegarTask.filter(
    (i) =>
      differenceInCalendarDays(
        startOfDay(parseISO(corvertDate(i.dtProxima))),
        hoje,
      ) === 0,
  );
  if (taskToday.length > 0) {
    taskToday.map((i) => {
      return (message = hasTodayTask({
        descrition: i.descrition,
        dtProxima: i.dtProxima,
      }));
    });

     await email(message);
     await delayEmail(1100)
  }

  const taskis2day = pegarTask.filter(
    (i) =>
        differenceInCalendarDays(
        startOfDay(parseISO(corvertDate(i.dtProxima))),
        hoje,
      ) === 2,
  );
  if (taskis2day.length > 0) {
    const bodyMsg =  taskis2day.map((i) =>  is2DaysTask({descrition:i.descrition, dtProxima:i.dtProxima}))
    message = bodyMsg.toString()
 
    await email(message);
    await delayEmail(1100)
  }
};

export function iniciarCronJob() {
  const tarefa = cron.schedule(
    "*/1 * * * *",
    async () => {
      console.log("Email faxina");
      return [sendEmailTask() ,sendEmailTransaction()];
    },
    {
      timezone: "America/Sao_Paulo",
    },
 
  );
  tarefa.stop()
}


