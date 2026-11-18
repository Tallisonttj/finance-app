import type { Request, Response } from "express";
import { userService } from "../services/userService.js";
import { createUserSchema, updateUserSchema } from "../schemas/userSchemas.js";
import { AuthService } from "../services/authService.js";
export const userControllers = {

  createUser: async (req: Request, res: Response) => {

      const body = await createUserSchema.parse(req.body);
      const user = await userService.create(body);
      res.status(201).json({
        user,
      });
  },
  updateUser: async (req: Request, res: Response) => {
      const {email} = req.params
      const body = updateUserSchema.parse(req.body);
      const user = await userService.update(body, email as string );
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
    return res.status(200).json(
      list
    )
  },
  userArea: async (req:Request, res:Response) => {
    const {email} =  req.params
    const userArea = await userService.userArea(email as string)
    return res.status(200).json(
      userArea
    )
  }
};

