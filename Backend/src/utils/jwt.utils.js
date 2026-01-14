import jwt from 'jsonwebtoken';

class JwtUtils {
    generateAccessToken(user){
        return jwt.sign(
            {_id: user._id, email: user.email},
            process.env.JWT_ACCESS,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
    }

    generateRefreshToken(user){
        return refreshToken = jwt.sign(
            {_id: user._id, email: user.email},
            process.env.JWT_REFRESH,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
    }
}

export default new JwtUtils();