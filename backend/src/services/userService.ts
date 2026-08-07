import { userRepository } from "../repository/userRepository.js";
import type { CreateuUserDTO } from "../schemas/userSchemas.js";



export const userService = {

    create: async (data:CreateuUserDTO) => {
     const existEmail = await userRepository.findByEmail(data.email)
     if (existEmail){
        throw new Error('E-mail ja cadastrado')
     }
    
     const existCPF= await userRepository.findByCPF(data.cpf)
     if (existCPF){
        throw new Error('CPF ja cadastrado')
     }
    
     return userRepository.create(data)
    } 

}