const registerService = require('../services/register.service');
const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');

async function signup(req, res){
    const { email, password, name } = req.body;

    try {
        const user = await registerService.signup(email, password, name);
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

module.exports = { signup };