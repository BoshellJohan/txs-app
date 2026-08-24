import {Request, Response} from 'express';
import testService from './users.service.js';

export const getAllUsers = async (req: Request, res: Response) => {
    try{
        const result = await testService.getAllUsers();
        return res.status(200).json({
            data: result,
        })
    } catch(err){
        return res.status(400).json({
            message: "Error consultando todos los usuarios"
        });
    }

}

