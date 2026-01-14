import User from '../../models/user.model.js';

class UserService {
    async getAllUsers(){
        const allUsers = User.find();
        return allUsers;
    }
}

export default new UserService();