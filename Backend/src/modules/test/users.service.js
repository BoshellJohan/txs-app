import { UserModel } from '../../models/user.model.js';

class UserService {
    async getAllUsers(){
        const allUsers = UserModel.find();
        return allUsers;
    }
}

export default new UserService();