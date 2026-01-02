const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

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

module.exports = { signup };