import User from '../../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { LoginDto, PublicUser, RegisterDto, ResetPasswordDto } from './auth.types.js';

class AuthService {
    async login(data: LoginDto): Promise<PublicUser> {
        const user = await User.findOne({email: data.email});

        if(!user){
            throw new Error('INVALID_CREDENTIALS');
        }

        const isValidPassword = await bcrypt.compare(data.password, user.password);

        if(!isValidPassword){
            throw new Error('INVALID_CREDENTIALS');
        }

        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.refreshTokens;

        return {
            _id: userObject._id.toString(),
            email: userObject.email,
            role: userObject.role,
        }
    }

    async signup(data: RegisterDto): Promise<PublicUser> {
        const existingUser = await User.findOne({email: data.email});

        if(existingUser){
            throw new Error('EMAIL_EXISTS');
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const user = new User({
            email: data.email,
            password: hashPassword,
            role: 'solicitante',
            name: name
        })

        const savedUser = await user.save();

        // const userObject = savedUser.toObject()

        return {
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
        }
    }

    async forgotPassword(email: string): Promise<string> {
        const user = await User.findOne({email});
        if(!user) throw new Error('If the email exists, a message was sent');

        //Token temporal para la recuperación de contraseña
        const token = crypto.randomBytes(32).toString('hex');
        const hashed = crypto.createHash('sha256').update(token).digest('hex');

        user.passwordRecoveryToken = hashed;
        user.passwordRecoveryExpires = Date.now() + 20 * 60 * 1000; //20 minutos

        await user.save();
        return token;
    }

    async resetPassword(data: ResetPasswordDto): Promise<void> {
        const hashed = crypto.createHash('sha256').update(data.token).digest('hex');

        const user = await User.findOne(
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
        const user = await User.findOne({email});
        if(!user) return null;

        const userObject = user.toObject();
        delete userObject.password;

        return userObject;
    }
}

export default new AuthService();