const users = [
    {
        "username": "Parra", "password": "xxxx"
    },
    {
        "username": "José", "password": "xxxx"
    }
]

function login(username, password){
    const user = users.find((u) => u.username == username && u.password == password);

    if(!user){
        return {success: false};
    }

    return {
        success: true,
        user: {
            username: user.username
        }
    }
}

module.exports = {login};