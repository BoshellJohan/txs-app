const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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
    if(!user) throw new Error('USER_NOT_FOUND');

    //Token temporal para la recuperación de contraseña
    const token = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.createHash('sha256').update(token).digest('hex');

    user.passwordRecoveryToken = hashed;
    user.passwordRecoveryExpires = Date.now() + 20 * 60 * 1000; //20 minutos

    await user.save();
    return token;
}

async function resetPassword(token, newPassword){
    const hashed = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne(
        {$and: [
            {passwordRecoveryToken: hashed},
            {passwordRecoveryExpires: {$gt: Date.now()}}
        ]});

    if(!user) throw new Error("INVALID_OR_EXPIRED_TOKEN");

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordRecoveryToken = undefined;
    user.passwordRecoveryExpires = undefined;
    await user.save();
}

async function getUser(email){
    const user = await User.findOne({email});
    if(!user) return null;

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = {forgotPassword, resetPassword, login, signup, getUser};