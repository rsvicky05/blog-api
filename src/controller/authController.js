const {register, login, logout} = require('../service/authService');

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

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        })

        res.status(200).send({token, message: "Logged In successfully"})
    }catch(err){
        next(err)
    }
}

const logoutUser = async (req, res, next) => {
    try{
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        res.status(200).send({message: "Logged Out Successfully"})
    }catch(err){
        next(err)
    }
}

module.exports = {registerUser, loginUser, logoutUser};