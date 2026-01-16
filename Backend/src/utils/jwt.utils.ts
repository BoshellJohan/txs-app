import jwt, { SignOptions } from 'jsonwebtoken';
import { IJwtPayload, IJwtRefreshPayload, PublicUser } from '../modules/auth/auth.types.js';

class JwtUtils {
    generateAccessToken(user: PublicUser){
        const payload: IJwtPayload = {
            _id: user._id.toString(),
            email: user.email,
            role: user.role,
            isActive: user.isActive
        }

        const secret = process.env.JWT_ACCESS!;

        const options: SignOptions = {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn']
        }
        return jwt.sign(payload, secret, options);
    }

    generateRefreshToken(user: PublicUser){
        const payload: IJwtRefreshPayload = {
            _id: user._id.toString(),
            email: user.email
        }

        const secret = process.env.JWT_REFRESH!;

        const options: SignOptions = {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION as SignOptions['expiresIn']
        }
        
        return jwt.sign(payload, secret, options);
    }
}

export default new JwtUtils();