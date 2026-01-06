const jwt = require('jsonwebtoken');

function generateAccessToken(user){
    const accessToken = jwt.sign(
        {_id: user._id, email: user.email},
        process.env.JWT_ACCESS,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION });
    return accessToken;
}

function generateRefreshToken(user){
    const refreshToken = jwt.sign(
        {_id: user._id, email: user.email},
        process.env.JWT_REFRESH,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });
    return refreshToken;
}

module.exports = {generateAccessToken, generateRefreshToken};