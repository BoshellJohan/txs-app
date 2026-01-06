const jwt = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const authService = require('../services/auth.service');

async function login(req, res){
    try{
        const {email, password} = req.body;
        const user = await authService.login(email, password);

        const token = jwt.sign(
        { id: user._id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
        )

        return res.status(200).json({
            token,
            user
        });
    } catch(err){
        if(err.message == 'INVALID_CREDENTIALS'){
            return res.status(401).json({
                message: 'INVALID CREDENTIALS',
            })
        }

        return res.status(500).json({
            message: 'ERROR WHILE LOGING',
        })
    }

}

async function signup(req, res){
    const { email, password, name } = req.body;

    try {
        const user = await authService.signup(email, password, name);
        const token = jwt.sign(
            { id: user._id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        return res.status(200).json({
            token,
            user
        });

    } catch(err){
        if(err.message === 'EMAIL_EXISTS'){
            return res.status(409).json({
                message: "Credenciales existentes en DB"
            })
        }
    }
}

async function getUser(req, res){
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: 'Token inválido'});
        req.user = user;
    })

    const user = await authService.getUser(req.user.email);

    if(!user) return res.status(400).json({message: "Error"});
    res.status(200).json({user, token});
}

module.exports = {login, signup, getUser};
