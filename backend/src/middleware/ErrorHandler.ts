import type { NextFunction, Request, Response } from "express";
import AppError from "../error/AppError.js";
import z from "zod";
import { Prisma } from "../generated/prisma/client.js";


export const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      mesagge: err.message,
    });
  }
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((i) => {
      return { message: i.message, path: i.path };
    });
    return res.status(400).json({
      message: "Dados invalidos",
      errors: errors,
    });
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError) {

    if(err.code === 'P2002'){
     return res.status(409).json({
      message: 'Informação ja existe no banco',
      error: err.code,
    });   
    }
    else if(err.code === 'P2025'){
     return res.status(409).json({
      message: 'Informação não existe no banco, sendo assim não da para atualizar ou deletar',
      error: err.code,
    });   
    }
  }
  return res.status(500).json({
    message: "Erro interno do servidor",
  });
};
