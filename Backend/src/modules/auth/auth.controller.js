import authService from './auth.service.js';
import JwtUtils from '../../utils/jwt.utils.js';
import userService from '../users/user.service.js';
import { sendPasswordResetEmail } from '../mail/mail.service.js';

class AuthController {
    async login(req, res){
        try{
            const {email, password} = req.body;
            const user = await authService.login(email, password);

            const accessToken = JwtUtils.generateAccessToken(user);
            const refreshToken = JwtUtils.generateRefreshToken(user);
            await userService.addRefreshToken(user.email, refreshToken);

            return res.status(200).json({
                success: true,
                accessToken,
                refreshToken,
                user
            });
        } catch(err){
            if(err.message == 'INVALID_CREDENTIALS'){
                return res.status(401).json({
                    success: false,
                    message: 'INVALID CREDENTIALS',
                })
            }

            return res.status(500).json({
                success: false,
                message: 'ERROR WHILE LOGING',
            })
        }

    }

    async signup(req, res){
        const { email, password, name } = req.body;

        try {
            const user = await authService.signup(email, password, name);
            const refreshToken = JwtUtils.generateRefreshToken(user);
            await userService.addRefreshToken(user.email, refreshToken);
            const accessToken = JwtUtils.generateAccessToken(user);

            return res.status(200).json({
                success: true,
                accessToken,
                refreshToken,
                user
            });

        } catch(err){
            if(err.message === 'EMAIL_EXISTS'){
                return res.status(409).json({
                    success: false,
                    message: "Credenciales existentes en DB"
                })
            }
        }
    }

    async refresh(req, res){
        const { refreshToken } = req.body;
        if(!refreshToken) return res.status(401).json({success: false, message: 'Refresh token required'});

        try {
            const user = await userService.getUserByRefreshToken(refreshToken);
            const newAccessToken = JwtUtils.generateAccessToken(user);

            return res.status(200).json({
                success: true,
                accessToken: newAccessToken
            })
        } catch(err){
            if(err.message == 'INVALID_TOKEN'){
                return res.status(401).json({success: false, message: "Refresh token inválido"});
            }

            return res.status(400).json({
                success: false, message: "Error al refrescar el token"
            })
        }
    }

    async logout(req, res){
        const { refreshToken } = req.body;
        await userService.clearRefreshToken(refreshToken);
        res.sendStatus(204);
    }

    async forgotPassword(req, res){
        const { email } = req.body;
        try {
            const token = await authService.forgotPassword(email);
            await sendPasswordResetEmail(email, token);
            return res.status(204);
        } catch(err){
            console.log(err)
            return res.status(500).json({success: false, message: "Error recuperando la contraseña"});
        }
    }

    async resetPassword(req, res){
        const { passwordToken, newPassword } = req.body;
        try {
            await authService.resetPassword(passwordToken, newPassword);
            return res.status(204);
        } catch(err){
            if(err.message == 'INVALID_TOKEN'){
                return res.status(401).json({success: false, message: "INVALID_TOKEN"});
            }

            return res.status(500).json({success: false, message: "Error while setting new password"});
        }
    }

    async getUser(req, res){
        const { refreshToken } = req.body;
        const user = await userService.getUserByRefreshToken(refreshToken);

        if(!user) return res.status(400).json({success: false, message: "Error obteniendo usuario"});
        res.status(200).json({success: true, user});
    }
}

export default new AuthController();