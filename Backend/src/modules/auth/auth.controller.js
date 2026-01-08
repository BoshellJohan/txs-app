const jwt = require('jsonwebtoken');
const authService = require('./auth.service');
const jwtUtils = require('../../utils/jwt.utils');
const userService = require('../users/user.service');

async function login(req, res){
    try{
        const {email, password} = req.body;
        const user = await authService.login(email, password);

        const accessToken = jwtUtils.generateAccessToken(user);
        const refreshToken = jwtUtils.generateRefreshToken(user);
        await userService.addRefreshToken(user.email, refreshToken);

        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user
        });
    } catch(err){
        if(err.message == 'INVALID_CREDENTIALS'){
            return res.status(401).json({
                success: false,
                message: 'INVALID CREDENTIALS',
            })
        }

        return res.status(500).json({
            success: false,
            message: 'ERROR WHILE LOGING',
        })
    }

}

async function signup(req, res){
    const { email, password, name } = req.body;

    try {
        const user = await authService.signup(email, password, name);
        const refreshToken = jwtUtils.generateRefreshToken(user);
        await userService.addRefreshToken(user.email, refreshToken);
        const accessToken = jwtUtils.generateAccessToken(user);

        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            user
        });

    } catch(err){
        if(err.message === 'EMAIL_EXISTS'){
            return res.status(409).json({
                success: false,
                message: "Credenciales existentes en DB"
            })
        }
    }
}

async function refresh(req, res){
    const { refreshToken } = req.body;
    if(!refreshToken) return res.status(401).json({success: false, message: 'Refresh token required'});

    try {
        const user = await userService.getUserByRefreshToken(refreshToken);
        const newAccessToken = jwtUtils.generateAccessToken(user);

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        })
    } catch(err){
        if(err.message == 'INVALID_TOKEN'){
            return res.status(401).json({success: false, message: "Refresh token inválido"});
        }
    }
}

async function logout(req, res){
    const { refreshToken } = req.body;
    await userService.clearRefreshToken(refreshToken);
    res.sendStatus(204);
}

async function getUser(req, res){
    const { refreshToken } = req.body;
    const user = await userService.getUserByRefreshToken(refreshToken);

    if(!user) return res.status(400).json({success: false, message: "Error obteniendo usuario"});
    res.status(200).json({success: true, user});
}

module.exports = {login, signup, refresh, logout, getUser};
