import z from "zod";



export const categorySchema = z.object({
    descrition: z.string().uppercase().trim(),
})

export type CreatecategoryDTO = z.infer<typeof categorySchema>