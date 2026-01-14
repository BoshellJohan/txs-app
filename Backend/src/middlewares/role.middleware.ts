import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(!req.user){
            return res.status(500).json({success: false, message: 'User not loaded'});
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({success: false, message: 'Forbidden'});
        }

        next();
    }
}