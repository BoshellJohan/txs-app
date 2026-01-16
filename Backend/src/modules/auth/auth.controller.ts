import { Request, Response } from 'express';
import authService from './auth.service.js';
import JwtUtils from '../../utils/jwt.utils.js';
import userService from '../users/user.service.js';
import { sendPasswordResetEmail } from '../mail/mail.service.js';
import { LoginDto, RegisterDto, ResetPasswordDto } from './auth.types.js';
import { AddRefreshToken } from '../users/user.types.js';

class AuthController {
    async login(req: Request, res: Response){
        try{
            const credentials: LoginDto = req.body;
            const user = await authService.login(credentials);

            const accessToken = JwtUtils.generateAccessToken(user);
            const refreshToken = JwtUtils.generateRefreshToken(user);

            const refreshData: AddRefreshToken = {email: user.email, token: refreshToken};
            await userService.addRefreshToken(refreshData);

            return res.status(200).json({
                success: true,
                accessToken,
                refreshToken,
                user
            });
        } catch(err: any){
            if(err.message == 'INVALID_CREDENTIALS'){
                return res.status(401).json({
                    success: false,
                    message: 'INVALID CREDENTIALS',
                })
            }
            console.log(err, err.message)
            return res.status(500).json({
                success: false,
                message: 'ERROR WHILE LOGING',
            })
        }

    }

    async signup(req: Request, res: Response){
        const credentials: RegisterDto = req.body;

        try {
            const user = await authService.signup(credentials);
            const refreshToken = JwtUtils.generateRefreshToken(user);
            const refreshData: AddRefreshToken = {email: user.email, token: refreshToken};
            await userService.addRefreshToken(refreshData);

            const accessToken = JwtUtils.generateAccessToken(user);

            return res.status(200).json({
                success: true,
                accessToken,
                refreshToken,
                user
            });

        } catch(err: any){
            if(err.message === 'EMAIL_EXISTS'){
                return res.status(409).json({
                    success: false,
                    message: "Credenciales existentes en DB"
                })
            }
        }
    }

    async refresh(req: Request, res: Response){
        const { refreshToken } = req.body;
        if(!refreshToken) return res.status(401).json({success: false, message: 'Refresh token required'});

        try {
            const user = await userService.getUserByRefreshToken(refreshToken);
            const newAccessToken = JwtUtils.generateAccessToken(user);

            return res.status(200).json({
                success: true,
                accessToken: newAccessToken
            })
        } catch(err: any){
            if(err.message == 'INVALID_TOKEN'){
                return res.status(401).json({success: false, message: "Refresh token inválido"});
            }

            return res.status(400).json({
                success: false, message: "Error al refrescar el token"
            })
        }
    }

    async logout(req: Request, res: Response){
        const { refreshToken } = req.body;
        await userService.clearRefreshToken(refreshToken);
        res.sendStatus(204);
    }

    async forgotPassword(req: Request, res: Response){
        const { email } = req.body;
        try {
            const token = await authService.forgotPassword(email);
            await sendPasswordResetEmail(email, token);
            return res.status(204);
        } catch(err){
            return res.status(500).json({success: false, message: "If the email exists, a message was sent"});
        }
    }

    async resetPassword(req: Request, res: Response){
        const data: ResetPasswordDto = req.body;
        try {
            await authService.resetPassword(data);
            return res.status(204);
        } catch(err: any){
            if(err.message == 'INVALID_TOKEN'){
                return res.status(401).json({success: false, message: "INVALID_TOKEN"});
            }

            return res.status(500).json({success: false, message: "Error while setting new password"});
        }
    }

    async getUser(req: Request, res: Response){
        const { refreshToken } = req.body;
        const user = await userService.getUserByRefreshToken(refreshToken);

        if(!user) return res.status(400).json({success: false, message: "Error obteniendo usuario"});
        res.status(200).json({success: true, user});
    }
}

export default new AuthController();