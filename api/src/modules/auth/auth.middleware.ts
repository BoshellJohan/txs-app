import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isJWTPayload } from '../../utils/jtw.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message: 'Token required'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS as string);
        if(!isJWTPayload(decoded)) throw new Error('INVALID_TOKEN_PAYLOAD');

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}