import { ResetPasswordDto } from './dtos/password.dto.js';
import passwordService from './password.service.js'
import {Request, Response} from 'express';

class PasswordController {
    forgotPassword(req: Request, res: Response){
        const { email } = req.body;
        return passwordService.forgotPassword(email);
    }

    resetPassword(req: Request, res: Response){
        const body: ResetPasswordDto = req.body;
        return passwordService.resetPassword(body);
    }
}

export default new PasswordController();