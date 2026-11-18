
import { generatedToken } from "../config/passport.js";
import AppError from "../error/AppError.js";
import type { Prisma } from "../generated/prisma/client.js";
import {createUserHash } from "../libs/hash.js";
import { userRepository } from "../repository/userRepository.js";
import type { updateUserDTO } from "../schemas/userSchemas.js";




export const userService = {

    create: async (data:Prisma.UserCreateInput) => {
     const existEmail = await userRepository.findByEmail(data.email)
     if (existEmail){
        throw new AppError('E-mail ja cadastrado', 409)
     }
    
     const existCPF= await userRepository.findByCPF(data.cpf)
     if (existCPF){
        throw new AppError('CPF ja cadastrado', 409)
     }
     const hashPassword = await createUserHash(data.password)

     const newUser = await userRepository.create({
      ...data,
      password:hashPassword
     })

     const token = generatedToken({id:newUser.id})

     return({
       menssage:`Usuario criado com sucesso` ,
       token
     })

    },
    update: async (data:updateUserDTO , email:string) => {

     if(data){
       const existEmail = await userRepository.findByEmail(data.email as string)
     if (existEmail){
        throw new AppError('E-mail ja cadastrado', 409)
     }
    
     const existCPF= await userRepository.findByCPF(data.cpf as string)
     if (existCPF){
        throw new AppError('CPF ja cadastrado', 409)
     }
     const hashPassword = await createUserHash(data.password as string)

     const newUser = await userRepository.update(email, {
      ...data,
      password:hashPassword
     })

    const token = generatedToken({id:newUser.id})

     return({
       menssage:`Usuario alterado com sucesso`,
       token
     })


      
     }
    

    },
    get: async() =>{
       return userRepository.list()
    },
    userArea: async(email:string) =>{
       const user = userRepository.userArea(email)
       return user

    }
}