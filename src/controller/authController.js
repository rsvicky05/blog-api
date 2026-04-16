const {register, login, logout, handleRefreshToken} = require('../service/authService');
const {pool} = require('../config/db')

const registerUser = async (req, res, next) => {
    try{
        const token = await register(req.body);
        res.cookie('accessToken', token.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        })

        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        })
        res.status(201).json({token, message: "User Registered Successfully"});
    }catch(err){
        next(err)
    }   
}

const loginUser = async (req, res, next) => {
    try{
        const token = await login(req.body)

        res.cookie('accessToken', token.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        })

        res.cookie('refreshToken', token.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(200).send({token, message: "Logged In successfully"})
    }catch(err){
        next(err)
    }
}

const logoutUser = async (req, res, next) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        const rows = await logout(refreshToken);
        
        res.cookie('accessToken', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        res.clearCookie('refreshToken');
        
        res.status(200).send({message: "Logged Out Successfully"})
    }catch(err){
        next(err)
    }
}

const refreshTokenHandler = async (req, res, next) => {
    try{
        const response = await handleRefreshToken(req.cookies.refreshToken);
        res.cookie("accessToken", response, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
            maxAge: 60 * 60 * 1000
        })
        res.status(200).send("New Token is Generated")
    }catch(err){
        next(err)
    }
}

const oAuthLogin = async (req, res, next) =>{
    try{
        console.log(req.query.code)
        res.send("OAuth Login Page")
    }catch(err){
        next(err)
    }
}

module.exports = {registerUser, loginUser, logoutUser, refreshTokenHandler, oAuthLogin};