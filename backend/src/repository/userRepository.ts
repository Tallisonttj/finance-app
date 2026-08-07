

import { prisma } from "../libs/prisma.js";
import type { CreateuUserDTO } from "../schemas/userSchemas.js";


export const userRepository = {
    async create(data:CreateuUserDTO){
        return prisma.user.create({
            data
        })
     },
    async findByEmail(email:string){
        return prisma.user.findUnique({
            where:{email}
        })
    },
    async findByCPF(cpf:string){
        return prisma.user.findUnique({
            where:{cpf}
        })
    }
}