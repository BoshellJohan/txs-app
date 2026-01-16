import jwt from 'jsonwebtoken';
import { UserModel } from '../../models/user.model.js';
import { AddRefreshToken, UserClient, UserDB } from './user.types.js';
import { IJwtRefreshPayload } from '../auth/auth.types.js';

class UserService {
    async addRefreshToken(data: AddRefreshToken): Promise<void>{
        const user = await UserModel.findOne({email: data.email});
        if(!user) throw new Error('INVALID_CREDENTIALS');

        user.refreshTokens.push({token: data.token, createdAt: new Date()});
        await user.save();
    }

    async clearRefreshToken(token: string): Promise<void> {
        await UserModel.updateOne({"refreshTokens.token": token}, {$pull: {refreshTokens: { token: token}}}
        );
    }

    async getUserByRefreshToken(token: string): Promise<UserDB>{
        const payload = jwt.verify(token, process.env.JWT_REFRESH as string) as IJwtRefreshPayload;
        const user = await UserModel.findOne({$and: [{"refreshTokens.token": token}, {_id: payload._id}]});

        if(!user) throw new Error('INVALID_TOKEN');
        return user.toObject();
    }

    async getUser(email: string){
        const user = await UserModel.findOne({email});
        if(!user) return null;

        const userObject: UserClient = user.toObject();
        delete userObject.password;

        return userObject;
    }
};

export default new UserService();