import { userRepository } from "../repository/userRepository.js";
import type { CreateuUserDTO } from "../schemas/userSchemas.js";



export const userService = {

    create: async (data:CreateuUserDTO) => {
     return userRepository.create(data)
    } 

}