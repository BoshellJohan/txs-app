import jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';

class UserService {
    async addRefreshToken(email, token){
        const user = await User.findOne({email});
        user.refreshTokens.push({token: token});
        await user.save();
    }

    async clearRefreshToken(token){
        await User.updateOne({"refreshTokens.token": token}, {$pull: {refreshTokens: { token: token}}}
        );
    }

    async getUserByRefreshToken(token){
        const payload = jwt.verify(token, process.env.JWT_REFRESH);
        const user = await User.findOne({$and: [{"refreshTokens.token": token}, {_id: payload._id}]});

        if(!user) throw new Error('INVALID_TOKEN');
        return user.toObject();
    }

    async getUser(email){
        const user = await User.findOne({email});
        if(!user) return null;

        const userObject = user.toObject();
        delete userObject.password;

        return userObject;
    }
};

export default new UserService();