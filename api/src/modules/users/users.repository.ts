import { ConflictError } from "../../common/errors/ConflictError.js";
import { prisma } from "../../infrastructure/database/prisma/prisma.client.js";
import { isUniqueConstraintError } from "../../infrastructure/database/prisma/prisma.errors.js";
import { RegisterType } from "./types/users.type.js";

class UsersRepository {
    async findByEmail(email: string){
        return await prisma.users.findUnique({where: {email: email}});
    }

    async findById(id: number){
        return await prisma.users.findUnique({where: {userid: id}});
    }

    async createUser(body: RegisterType, hashPassword: string){
        try {
            return await prisma.users.create({
                data: {
                    email: body.email,
                    password: hashPassword
                }
            });
        } catch (error) {
            if(isUniqueConstraintError(error)){
                throw new ConflictError('Email already registered');
            }

            throw error;
        }
    }
}

export default new UsersRepository();

