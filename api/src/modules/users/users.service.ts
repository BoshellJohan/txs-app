import { RegisterType } from './types/users.type.js';
import usersRepository from './users.repository.js';
import { hashString } from '../../utils/bcrypt.js';
import { NotFoundError } from '../../common/errors/NotFoundError.js';
import { ConflictError } from '../../common/errors/ConflictError.js';

class UsersService {
    async getUserByEmail(email: string){
        try {
            const user = await usersRepository.findByEmail(email);
            if(!user) throw new NotFoundError('User not found');
            return user;
        } catch (error){
            throw error;
        }
    }

    async getUserById(id: number){
        try {
            const user = await usersRepository.findById(id);
            if(!user) throw new NotFoundError('User not found');
            return user;
        } catch (error){
            throw error;
        }
    }

    async signup(body: RegisterType){
        try {
            const resUser = await usersRepository.findByEmail(body.email);
            if(resUser) throw new ConflictError('Email already exists');

            const hashPassword = await hashString(body.password);
            await usersRepository.createUser(body, hashPassword);
            return;
        } catch (error) {
            throw error;
        }
    }
};

export default new UsersService();