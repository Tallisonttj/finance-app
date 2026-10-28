import AppError from "../error/AppError.js";
import { categoryRepository } from "../repository/categoryRepository.js";
import { transactionRepository } from "../repository/transactionRepository.js";
import type { CreatecategoryDTO } from "../schemas/categorySchemas.js";

export const categoryService = {
  create: async (data:CreatecategoryDTO) => {
   const existCategory = await categoryRepository.findFirst(data.descrition)
   if(existCategory){
      throw new AppError('Ja existe Essa categoria', 409)
   }
   return categoryRepository.create({descrition:data.descrition})

  },
  listCategory: async() => {
    let list = await categoryRepository.listCategory()
    if(list.length === 0){
      return 'Não tem nenhuma categoria cadastrada'
    }
    return list
  
  },
  updateCategory: async(id:string, newDescrition:string) => {
    const existCategory = await categoryRepository.findFirst(newDescrition)
   if(existCategory?.descrition == newDescrition && existCategory.id !== id){
      throw new AppError('Ja existe Essa categoria', 409)
   }
    return categoryRepository.updateCategory(id, newDescrition)
  },
  deleteCategory: async(id:string) => {
    const existTransaction = await transactionRepository.findCategory(id)
    if(existTransaction){
      throw new AppError('Não é possível excluir esta categoria pois existem transações ativas vinculadas a ela', 409)
    }
    const delCategory = await categoryRepository.deleteCategory(id)
    return delCategory
  }
};
