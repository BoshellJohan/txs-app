const jwt = require('jsonwebtoken');

function generateAccessToken(user){
    return jwt.sign(
        {_id: user._id, email: user.email},
        process.env.JWT_ACCESS,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
}

function generateRefreshToken(user){
    return refreshToken = jwt.sign(
        {_id: user._id, email: user.email},
        process.env.JWT_REFRESH,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
}

module.exports = {generateAccessToken, generateRefreshToken};