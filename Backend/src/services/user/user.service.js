const User = require('../../models/user.model');

async function updateRefreshToken(email, token){
    await User.updateOne({email}, {$set: {refreshToken: token}});
}

async function clearRefreshToken(){
    await User.updateOne({email}, {$unset: {refreshToken: ''}});
}

module.exports = {updateRefreshToken, clearRefreshToken};