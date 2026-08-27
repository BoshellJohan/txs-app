import {Request, Response} from 'express';
import usersService from './users.service.js';
import { RegisterDto } from './dtos/users.dto.js';

class UsersController {
    async userById(req: Request, res: Response){
        const { id } = req.body;
        const user = await usersService.getUserById(id)
        return res.status(200).json({
            success: true,
            data: user,
        })
    }

    async userByEmail(req: Request, res: Response){
        const { email } = req.body;
        const user = await usersService.getUserByEmail(email);
        return res.status(200).json({
            success: true,
            data: user,
        })
    }

    async signup(req: Request, res: Response){
        const credentials: RegisterDto = req.body;
        await usersService.signup(credentials);
        return res.status(201).json({success: true});
    }
}

export default new UsersController();