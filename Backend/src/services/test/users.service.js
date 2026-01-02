const User = require('../../models/user.model');

async function getAllUsers(){
    console.log("Consultando usuarios");
    const allUsers = User.find();
    console.log(allUsers);
    return allUsers;
}

module.exports = { getAllUsers };