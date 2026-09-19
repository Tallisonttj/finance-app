import z from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    cpf:  z.string().length(11,'O item deve conter 11 digitos'),
    email: z.email({error: 'O item não é um e-mail validoc'}),
    password:z.string()
})

export type CreateuUserDTO = z.infer<typeof createUserSchema>

export const loginUserSchema = z.object({
    email: z.email({error: 'O item não é um e-mail validoc'}),
    password:z.string()
})

export type LoginDTO = z.infer<typeof loginUserSchema>