import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../common/errors/ForbiddenError.js';

export const roleMiddleware = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user){
            throw new Error;
        }

        if(!allowedRoles.includes(req.user.role)){
            throw new ForbiddenError('User does not have enough permissions');
        }

        next();
    }
}