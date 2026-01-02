const User = require('../models/user.model');

async function findOne(email){
    const user = await User.findOne({email});
    if(!user) return null;
    return user.toObject();
}

module.exports = {findOne};