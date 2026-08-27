import jwt, { SignOptions } from 'jsonwebtoken';
import { UserType } from '../modules/users/types/users.type.js';
import { IJwtPayload, IJwtRefreshPayload } from '../types/jwt.type.js';

class JwtUtils {
    generateAccessToken(user: UserType){
        const payload: IJwtPayload = {
            _id: user.userid.toString(),
            email: user.email,
            role: user.role
        }

        const secret = process.env.JWT_ACCESS!;

        const options: SignOptions = {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn']
        }
        return jwt.sign(payload, secret, options);
    }

    generateRefreshToken(user: UserType){
        const payload: IJwtRefreshPayload = {
            _id: user.userid.toString(),
            email: user.email
        }

        const secret = process.env.JWT_REFRESH!;

        const options: SignOptions = {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION as SignOptions['expiresIn']
        }
        
        return jwt.sign(payload, secret, options);
    }
}

export default new JwtUtils();