import { Hash } from "node:crypto";
import { prisma } from "../../infrastructure/database/prisma/prisma.client.js";

class PasswordRepository {
    async updatePasswordRecovery(email: string, hash: string, expiresAt: Date){
        await prisma.users.update({
            where: {
                email: email
            },
            data: {
                passwordrecoveryexpires: expiresAt,
                passwordrecoverytoken: hash
            }
        })
    }

    async checkPasswordRecovery(hash: Hash){
        const currentTimestamp = Date.now();
        const user = await prisma.users.findFirst({
            where: {
                passwordrecoverytoken: String(hash),
                passwordrecoveryexpires: {
                    lt: new Date(currentTimestamp)
                }
            }
        }) 
        return user ? user.email : null;
    }

    async updatePassword(email: string, newPassword: string){
        await prisma.users.update({
          where: {
            email: email,
          }, 
          data: {
            password: newPassword,
            passwordrecoveryexpires: undefined,
            passwordrecoverytoken: undefined
          }
        })
        return;
    }
}

export default new PasswordRepository();