import { Request, Response } from 'express';
import authService from './auth.service.js';
import { LoginDto } from './types/auth.types.js';


class AuthController {
    async login(req: Request, res: Response){
        const credentials: LoginDto = req.body;
        return await authService.login(credentials);
    }

    async logout(req: Request, res: Response){
        const { refreshToken } = req.body;
        return await authService.logout(refreshToken);
    }

    async refresh(req: Request, res: Response){
        const { refreshToken } = req.body;
        return await authService.refresh(refreshToken);    
    }
}

export default new AuthController();