import AppError from "../error/AppError.js"
import { comparePassword } from "../libs/hash.js"
import { userRepository } from "../repository/userRepository.js"
import type { LoginDTO } from "../schemas/userSchemas.js"
import dotEnv from 'dotenv'

import { generatedToken } from "../config/passport.js"



dotEnv.config()




 
 export const AuthService = {
 
login: async (data:LoginDTO) => {
    
     const user = await userRepository.findByEmail(data.email)
     if (!user){
        throw new AppError('E-mail não cadastrado!', 401)
     }

     const userPassword = await comparePassword(data.password, user.password)
     if(!userPassword){
       throw new AppError('E-mail ou senha inválidos', 401)
     }
     
     const token = generatedToken({id: user.id})
      return {
        status:true,
        email:user.email,
        token,
      }
    }, 
  
}