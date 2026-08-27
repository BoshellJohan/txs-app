import { createHash, generateToken } from "../../utils/crypto.js";
import { sendPasswordResetEmail } from "../mail/mail.service.js";
import usersService from "../users/users.service.js";
import passwordRepository from "./password.repository.js";
import { ResetPasswordType } from "./types/password.type.js";
import { NotFoundError } from "../../common/errors/NotFoundError.js";
import { hashString } from "../../utils/bcrypt.js";
import { UnauthorizedError } from "../../common/errors/UnauthorizedError.js";

class PasswordService {
    async forgotPassword(email: string){
        try {
            const user = await usersService.getUserByEmail(email);
            if(!user) throw new UnauthorizedError('Invalid credentials or user not found');

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
            const hashed = createHash(body.passwordToken);
            const email = await passwordRepository.checkPasswordRecovery(hashed)
            if(!email) throw new NotFoundError('User not found');
            
            const passwordHashed = await hashString(body.newPassword);
            await passwordRepository.updatePassword(email, passwordHashed);
            return;
        } catch (error){
            throw error;
        }
    }
}

export default new PasswordService();