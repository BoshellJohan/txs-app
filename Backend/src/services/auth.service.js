const users = [{_id: 123, email: "Parra", password: "xxxx", name: "Alejandro"}];

function findOne(email){
    const user = users.find((u) => u.email == email);
    if(!user) return null;
    return user;
}

module.exports = {findOne};