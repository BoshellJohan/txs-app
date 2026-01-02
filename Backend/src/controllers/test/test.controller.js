const testService = require('../../services/test/users.service');

async function getAllUsers(req, res) {
    try{
        const result = await testService.getAllUsers();
        return res.status(200).json({
            data: result,
        })
    } catch(err){
        console.log("Error: ", err.message);
        return res.status(400).json({
            message: "Error consultando todos los usuarios"
        });
    }

}

module.exports = {getAllUsers};