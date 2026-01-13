const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function login(email, password){
    const user = await User.findOne({email});

    if(!user){
        throw new Error('INVALID_CREDENTIALS');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        throw new Error('INVALID_CREDENTIALS');
    }

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.refreshTokens;

    return userObject;
}

async function signup(email, password, name){
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error('EMAIL_EXISTS');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
        email: email,
        password: hashPassword,
        name: name
    })

    const savedUser = await user.save();

    const userObject = savedUser.toObject()
    delete userObject.password;

    return userObject;
}

async function forgotPassword(email){
    const user = await User.findOne({email});
    //Token temporal para la recuperación de contraseña
    const tempToken = jwt.sign(
        {_id: user.id, email: user.email},
        process.env.PASSWORD_TOKEN,
        {expiresIn: '20m'}
    )

    //Guardar token hasheado
    const hashToken = await bcrypt.hash(tempToken, 10);
    user.passwordRecoveryToken = hashToken;
    const savedUser = await user.save();

    return tempToken;
    //Enviar email con el link
    //http:/localhost:8080/reset-password/token=XYZ
    //Tiene 20 mins para terminar el proceso
}

async function getUser(email){
    const user = await User.findOne({email});
    if(!user) return null;

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = {forgotPassword, login, signup, getUser};