import { UserModel } from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { LoginDto, PublicUser, RegisterDto, ResetPasswordDto } from './auth.types.js';
import { UserClient } from '../users/user.types.js';

class AuthService {
    async login(credentials: LoginDto): Promise<PublicUser> {
        const user = await UserModel.findOne({email: credentials.email});

        if(!user){
            throw new Error('INVALID_CREDENTIALS');
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if(!isValidPassword){
            throw new Error('INVALID_CREDENTIALS');
        }

        const userObject = user.toObject();
        return {
            _id: userObject._id.toString(),
            email: userObject.email,
            role: userObject.role,
            isActive: userObject.isActive
        }
    }

    async signup(credentials: RegisterDto): Promise<PublicUser> {
        const existingUser = await UserModel.findOne({email: credentials.email});

        if(existingUser){
            throw new Error('EMAIL_EXISTS');
        }

        const hashPassword = await bcrypt.hash(credentials.password, 10);

        const user = new UserModel({
            email: credentials.email,
            password: hashPassword,
            role: 'solicitante',
            name: credentials.name
        })
        
        const savedUser = await user.save();
        const userObject = savedUser.toObject();
        return {
            _id: userObject._id.toString(),
            email: userObject.email,
            role: userObject.role,
            isActive: userObject.isActive
        }
    }

    async forgotPassword(email: string): Promise<string> {
        const user = await UserModel.findOne({ email });
        if(!user) throw new Error('If the email exists, a message was sent');

        //Token temporal para la recuperación de contraseña
        const token = crypto.randomBytes(32).toString('hex');
        const hashed = crypto.createHash('sha256').update(token).digest('hex');

        user.passwordRecoveryToken = hashed;
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 20); //20 minutos
        user.passwordRecoveryExpires = expiresAt

        await user.save();
        return token;
    }

    async resetPassword(data: ResetPasswordDto): Promise<void> {
        const hashed = crypto.createHash('sha256').update(data.passwordToken).digest('hex');

        const user = await UserModel.findOne(
            {$and: [
                {passwordRecoveryToken: hashed},
                {passwordRecoveryExpires: {$gt: Date.now()}}
            ]});

        if(!user) throw new Error("INVALID_OR_EXPIRED_TOKEN");

        user.password = await bcrypt.hash(data.newPassword, 10);
        user.passwordRecoveryToken = undefined;
        user.passwordRecoveryExpires = undefined;
        await user.save();
    }

    //Función de prueba, se debe borrar o mover al userService;
    async getUser(email: string){
        const user = await UserModel.findOne({email});
        if(!user) return null;

        const userObject: UserClient = user.toObject();
        delete userObject.password;

        return userObject;
    }
}

export default new AuthService();