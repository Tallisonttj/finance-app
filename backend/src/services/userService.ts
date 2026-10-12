
import { generatedToken } from "../config/passport.js";
import AppError from "../error/AppError.js";
import type { Prisma } from "../generated/prisma/client.js";
import {createUserHash } from "../libs/hash.js";
import { userRepository } from "../repository/userRepository.js";



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
     console.log(token)
     return({
       menssage:`Usuario criado com sucesso` ,
       token
     })

    },
    get: async() =>{
       return userRepository.list()
    }
}