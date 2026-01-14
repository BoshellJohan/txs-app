import jwt from 'jsonwebtoken';
import authService from './auth.service.js';

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message: 'Token required'});

    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS);
        const user = await authService.getUser(payload.email);
        if(!user) return res.status(401).json({message: 'User not found'});

        req.user = user;
        next();
    } catch (err) {
        console.log(err, err.message)
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

}