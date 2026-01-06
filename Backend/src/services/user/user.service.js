const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

async function addRefreshToken(email, token){
    const user = await User.findOne({email});
    user.refreshTokens.push({token: token});
    await user.save();
}

async function clearRefreshToken(token){
    await User.updateOne({"refreshTokens.token": token}, {$pull: {refreshTokens: { token: token}}}
    );
}

async function getUserByRefreshToken(token){
    const payload = jwt.verify(token, process.env.JWT_REFRESH);
    const user = await User.findOne({$and: [{"refreshTokens.token": token}, {_id: payload._id}]});

    if(!user) throw new Error('INVALID_TOKEN');
    return user.toObject();
}

async function getUser(email){
    const user = await User.findOne({email});
    if(!user) return null;

    const userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

module.exports = {addRefreshToken, clearRefreshToken, getUserByRefreshToken, getUser};