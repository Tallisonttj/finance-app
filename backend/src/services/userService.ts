
import { generatedToken } from "../config/passport.js";
import AppError from "../error/AppError.js";
import {createUserHash } from "../libs/hash.js";
import { userRepository } from "../repository/userRepository.js";
import type { CreateuUserDTO, LoginDTO } from "../schemas/userSchemas.js";



export const userService = {

    create: async (data:CreateuUserDTO) => {
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
       menssage:`Usuario criado com o e-mail ${newUser.email} e nome ${newUser.name} ${newUser.password}` ,
       token
     })

    },
    get: async() =>{
       return userRepository.list()
    }
}