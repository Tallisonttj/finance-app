import z from "zod";



export const taskSchema = z.object({
    descrition: z.string().uppercase().trim(),
    categoryId: z.string(),
    valor: z.union([z.number().positive().optional(), z.null()]),
    interval:z.number().int().positive(),
    dtProxima: z.coerce.date()
})

export type CreateTaskDTO = z.infer<typeof taskSchema>