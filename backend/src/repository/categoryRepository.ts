import { prisma } from "../libs/prisma.js";
import type { CreatecategoryDTO } from "../schemas/categorySchemas.js";



export const categoryRepository = {
    async create(data:CreatecategoryDTO){
       
        return prisma.category.create({data})
    },
    async findFirst(descrition:string){
        return prisma.category.findFirst({
            where:{descrition}
        })
    },
    async listCategory(){
        return prisma.category.findMany()
    },
    async updateCategory(id:string, newDescrition:string){
        return prisma.category.update({
            where:{
                id:id
            },
            data:{
                descrition:newDescrition
            }
        })
    },
    async deleteCategory(id:string){
        return prisma.category.delete({
            where:{
                id:id
            }
        })
    }
}