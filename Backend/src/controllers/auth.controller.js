const jwt = require('jsonwebtoken');
const bcrypt  = require('bcryptjs');
const authService = require('../services/auth.service');

async function login(req, res){
    const {email, password} = req.body;
    const user = authService.findOne(email);

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

module.exports = {login};
