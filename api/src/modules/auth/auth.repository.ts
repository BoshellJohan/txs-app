import { prisma } from "../../infrastructure/database/prisma/prisma.client.js";
import { AddTokenType } from "./types/auth.types.js";

class AuthRepository {
    async addRefreshToken(body: AddTokenType){
        return await prisma.refreshtokens.create({
            data: {
                token: body.token,
                createdat: new Date(),
                users: {
                    connect: {userid: body.id}
                }
            }
        });
    }

    async clearRefreshToken(token: string){
        await prisma.refreshtokens.updateMany({
            where: {
                token: token
            },
            data: {
                active: 0
            }
        })
        return;
    }

    async getUserByRefreshToken(token: string){
        return await prisma.users.findFirst({
            include: {
                refreshtokens: {
                    where: {
                        token: token
                    }
                }
            }
        })
    }
}

export default new AuthRepository();