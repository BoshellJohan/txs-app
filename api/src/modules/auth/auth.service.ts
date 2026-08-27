import { AddTokenType, LoginDto } from './types/auth.types.js';
import usersService from '../users/users.service.js';
import { compareHashes } from '../../utils/bcrypt.js';
import jwtUtils from '../../utils/jwt.utils.js';
import authRepository from './auth.repository.js';
import { UnauthorizedError } from '../../common/errors/UnauthorizedError.js';
import { NotFoundError } from '../../common/errors/NotFoundError.js';


class AuthService {
    async login(credentials: LoginDto) {
        try {
            const user = await usersService.getUserByEmail(credentials.email);

            const isValidPassword = await compareHashes(credentials.password, user.password);
            if(!isValidPassword){
                throw new UnauthorizedError('Invalid credentials or user does not exist');
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
            if(error instanceof NotFoundError){
                throw new UnauthorizedError('Invalid credentials or user not found');
            }

            throw error;
        }
    }

    async logout(token: string): Promise<void> {
        return await authRepository.clearRefreshToken(token);
    }

    async refresh(token: string): Promise<string> {
        const user = await authRepository.getUserByRefreshToken(token);
        if(!user) throw new UnauthorizedError('Invalid credentials');

        return jwtUtils.generateAccessToken(user);
    }
}

export default new AuthService();