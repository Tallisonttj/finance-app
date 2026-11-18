

import { prisma } from "../libs/prisma.js";
import type { CreateuUserDTO, updateUserDTO } from "../schemas/userSchemas.js";


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
    },
    async findById(id:string){
        return prisma.user.findFirst({
            where:{id:id}
        })
    },
    async list(){
        return prisma.user.findMany({
            omit:{
                createdAt:true,
                updatedAt:true,
                password:true    
            }
        }) 
    } ,
    async userArea(email:string){
        return prisma.user.findUnique({
            where:{email:email},
            omit:{
                createdAt:true,
                updatedAt:true,
                password:true    
            }
        }) 
    }, 
    async update(email:string, data:updateUserDTO){
        return prisma.user.update({
            where:{email:email},
            data:{
                data
            }
        }) 
    } 
}