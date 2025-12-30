const authService = require('../services/auth.service');

function login(req, res){
    const {username, password} = req.body;
    const result = authService.login(username, password);

    if(!result.success){
        return res.status(401).json({
            success: false,
            message: "Credenciales inválidas"
        })
    }

    return res.status(200).json(
        {
            sucess: true,
            user: result.user
        }
    )
}

module.exports = {login};
