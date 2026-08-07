import type { Request, Response } from "express";
import { userService } from "../services/userService.js";
import { createUserSchema } from "../schemas/userSchemas.js";
export const userControllers = {

  postUsers: async (req: Request, res: Response) => {
    try {
      const body = createUserSchema.parse(req.body);
      const user = await userService.create(body);
      res.status(201).json({
        user,
      });
    } catch (error) {
      if (error instanceof Error)
        res.status(409).json({
          message: error.message,
        });
    }
  },
};
