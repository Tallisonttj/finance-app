
import type { Request, Response } from "express"
import { userService } from "../services/userService.js"
import { createUserSchema } from "../schemas/userSchemas.js"
export const userControllers ={
    postUsers: async (req: Request, res: Response) => {
        const body = createUserSchema.parse(req.body)
        await userService.create(body)
        return res.status(201).json({
            message: "recebido com sucesso"
        })

    }
}