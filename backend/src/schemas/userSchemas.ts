import z from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    cpf:  z.string().length(11, 'O item deve conter 11 digitos'),
    email: z.email(),
    password:z.string()
})

export type CreateuUserDTO = z.infer<typeof createUserSchema>