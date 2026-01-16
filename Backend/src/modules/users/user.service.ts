import jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';
import { AddRefreshToken, UserDB } from './user.types.js';
import { IJwtRefreshPayload } from '../auth/auth.types.js';

class UserService {
    async addRefreshToken(data: AddRefreshToken): Promise<void>{
        const user = await User.findOne({email: data.email});
        user.refreshTokens.push({token: data.token});
        await user.save();
    }

    async clearRefreshToken(token: string): Promise<void> {
        await User.updateOne({"refreshTokens.token": token}, {$pull: {refreshTokens: { token: token}}}
        );
    }

    async getUserByRefreshToken(token: string): Promise<UserDB>{
        const payload = jwt.verify(token, process.env.JWT_REFRESH as string) as IJwtRefreshPayload;
        const user = await User.findOne({$and: [{"refreshTokens.token": token}, {_id: payload._id}]});

        if(!user) throw new Error('INVALID_TOKEN');
        return user.toObject();
    }

    async getUser(email: string){
        const user = await User.findOne({email});
        if(!user) return null;

        const userObject = user.toObject();
        delete userObject.password;

        return userObject;
    }
};

export default new UserService();