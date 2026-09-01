import {Request, Response} from 'express';
import usersService from './users.service.js';
import { RegisterDto } from './dtos/users.dto.js';
import { BadRequestError } from '../../common/errors/BadRequestError.js';

class UsersController {
    async user(req: Request, res: Response){
        const userReq = req.user;
        if(!userReq) throw new BadRequestError();
        console.log(userReq)
        const id = Number(userReq._id);
        const user = await usersService.getUserById(id)
        return res.status(200).json({
            success: true,
            data: user,
        })
    }

    async userById(req: Request, res: Response){
        const id = Number(req.params.id);
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