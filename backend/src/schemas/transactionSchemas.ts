import z from "zod";
import { Status, TipoConta } from "../generated/prisma/client.js";
export const createTransaction = z.object({
  name: z.string({ message: "Nome da despesa é obrigatorio" }).trim(),
  categoryName: z.string().uppercase().trim(),
  total: z.number().positive(),
  responsavelDivida: z.string({message: 'Nome do dono da divida'}).trim(),
  dtVencimento: z.coerce.date(),
  parcelaAtual: z.number().default(1),
  totalParcelas: z.number().default(1),
  tipoConta: z.enum(TipoConta).default(TipoConta.INDIVIDUAL),
  status: z.enum(Status).default(Status.PENDENTE),
});

export type CreateTransactionDTO = z.infer<typeof createTransaction>;
