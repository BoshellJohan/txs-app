const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


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

    return userObject;
}

async function getUser(email){
    const user = await User.findOne({email});
    if(!user) return null;

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = {login, getUser};