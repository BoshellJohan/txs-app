import { createHash, Hash } from "node:crypto";
import { generateToken } from "../../utils/cryto.js";
import { sendPasswordResetEmail } from "../mail/mail.service.js";
import usersService from "../users/users.service.js";
import passwordRepository from "./password.repository.js";
import { ResetPasswordType } from "./types/password.type.js";
import { NotFoundError } from "../../common/errors/NotFoundError.js";

class PasswordService {
    async forgotPassword(email: string){
        try {
            const user = await usersService.getUserByEmail(email);
            if(!user) throw new NotFoundError('User not found');

            const { token, hash } = generateToken();
            
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + 20);

            await passwordRepository.updatePasswordRecovery(email, hash, expiresAt);
            await sendPasswordResetEmail(email, token);
            return;
        } catch (error){
            throw error;
        }
    }

    async resetPassword(body: ResetPasswordType){
        try {
            const hashed: Hash = createHash(body.passwordToken);
            const email = await passwordRepository.checkPasswordRecovery(hashed)
            if(!email) throw new NotFoundError('User not found');
            
            await passwordRepository.updatePassword(email, body.newPassword);
            return;
        } catch (error){
            throw error;
        }
    }
}

export default new PasswordService();