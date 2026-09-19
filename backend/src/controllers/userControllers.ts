import type { Request, Response } from "express";
import { userService } from "../services/userService.js";
import { createUserSchema } from "../schemas/userSchemas.js";
import { AuthService } from "../services/authService.js";
export const userControllers = {

  createUser: async (req: Request, res: Response) => {
   
      const body = createUserSchema.parse(req.body);
      const user = await userService.create(body);
      res.status(201).json({
        user,
      });
  },
  login: async (req:Request, res:Response) => {
    const body = req.body
    const login = await AuthService.login(body)
    return res.status(200).json(
      login
    )
  },
  listUsers: async (req:Request, res:Response) => {
     
    const list = await userService.get()
    console.log('User', req.user as object)
    return res.status(200).json(
      list
    )
  }
};

