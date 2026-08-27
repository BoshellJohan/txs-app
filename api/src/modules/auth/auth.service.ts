import { AddTokenType, LoginDto } from './types/auth.types.js';
import usersService from '../users/users.service.js';
import { compareHashes } from '../../utils/bcrypt.js';
import jwtUtils from '../../utils/jwt.utils.js';
import authRepository from './auth.repository.js';
import { NotFoundError } from '../../common/errors/NotFoundError.js';
import { UnauthorizedError } from '../../common/errors/UnauthorizedError.js';


class AuthService {
    async login(credentials: LoginDto) {
        try {
            const user = await usersService.getUserByEmail(credentials.email);
    
            if(!user){
                throw new NotFoundError('User not found');
            }
    
            const isValidPassword = await compareHashes(credentials.password, user.password);
    
            if(!isValidPassword){
                throw new UnauthorizedError('Invalid credentials');
            }
    
            const accessToken = jwtUtils.generateAccessToken(user);
            const refreshToken = jwtUtils.generateRefreshToken(user);

            const refreshData: AddTokenType = {id: user.userid, token: refreshToken};
            await authRepository.addRefreshToken(refreshData);
            
            return {
                accessToken,
                refreshToken
            };
        } catch (error){
            throw error;
        }
    }

    async logout(token: string): Promise<void> {
        try {
            return await authRepository.clearRefreshToken(token);
        } catch(error){
            throw error;
        }
    }

    async refresh(token: string): Promise<string> {
        try {
            const user = await authRepository.getUserByRefreshToken(token);
            if(!user) throw new UnauthorizedError('Invalid credentials');

            return jwtUtils.generateAccessToken(user);
        } catch (error){
            throw error;
        }
    }
}

export default new AuthService();