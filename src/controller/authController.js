const {register, login} = require('../service/authService');

const registerUser = async (req, res, next) => {
    try{
        const token = await register(req.body);
        res.status(201).json({token, message: "User Registered Successfully"});
    }catch(err){
        next(err)
    }
    
}

const loginUser = async (req, res, next) => {
    try{
        const token = await login(req.body)
        res.status(200).send({token, message: "Logged In successfull"})
    }catch(err){
        next(err)
    }
}

module.exports = {registerUser, loginUser};