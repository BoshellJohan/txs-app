const jwt = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const authService = require('../services/auth.service');

async function login(req, res){
    const {email, password} = req.body;
    const user = await authService.findOne(email.toLowerCase());

    if(!user){
        return res.status(401).json({
            success: false,
            message: "Usuario no encontrado"
        });
    };

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(401).json({
            success: false,
            message: "Contraseña incorrecta"
        });
    };

    const token = jwt.sign(
        { id: user._id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION }
    )

    return res.status(200).json(
        {
            sucess: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            token
        }
    )
}

async function getUser(req, res){
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({message: 'Token inválido'});
        req.user = user;
    })

    const user = await authService.findOne(req.user.email);

    if(!user) return res.status(400).json({message: "Error"});
    res.status(200).json({user, token});
}

module.exports = {login, getUser};
