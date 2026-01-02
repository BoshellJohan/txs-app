const User = require('../models/user.model');

async function findOne(email){
    const user = await User.findOne({email});
    if(!user) return null;

    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = {findOne};