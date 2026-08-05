

import { prisma } from "../libs/prisma.js";
import type { CreateuUserDTO } from "../schemas/userSchemas.js";


export const userRepository = {
    create: (data:CreateuUserDTO) => {
        return prisma.user.create({
            data
        })
     }

}