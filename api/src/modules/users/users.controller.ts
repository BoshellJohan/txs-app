import {Request, Response} from 'express';
import usersService from './users.service.js';
import { RegisterDto } from './dtos/users.dto.js';

class UsersController {
    async userById(req: Request, res: Response){
        const { id } = req.body;
        await usersService.getUserById(id)
        return res.status(200).json({
            success: true,
            
        })
    }

    async userByEmail(req: Request, res: Response){
        const { email } = req.body;
        try {
            return await usersService.getUserByEmail(email)
        } catch (error){

        }
    }

    async signup(req: Request, res: Response){
        const credentials: RegisterDto = req.body;
        try {
            return await usersService.signup(credentials);
        } catch (error){

        }
    }
}

export default new UsersController();