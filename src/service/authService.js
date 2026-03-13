const bcrypt = require('bcrypt')
const {findByEmail, createUser, storeInDB} = require('../models/User');
const generateToken = require('../utils/generateToken');
const {pool} = require('../config/db')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError');
const sendMail = require('../utils/mailSender');
const send = require('../utils/mailSender');

const register = async ({first_name, last_name, email, password, role}) => {
    const existing = await findByEmail(email);

    if(existing){
        throw new AppError("User already registered", 409);
    }

    if(role && role === "admin"){
        throw new AppError("Admin user cannot be created", 403);
    }

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
        first_name,
        last_name,
        email,
        hasedPassword,
        'user'
    )
    
    const accessToken = generateToken.generateAccessToken(user);
    const refreshToken = generateToken.generateRefreshToken(user);

    const decoded = jwt.decode(refreshToken);
    const response = await storeInDB(user.id, refreshToken, decoded.exp);

    sendMail(email, "Registered Succesfully", "Thank you for registering to our website!!!.")

    return {accessToken, refreshToken};  
}

const login = async ({email, password}) => {
    const userInfo = await findByEmail(email);

    if(!userInfo){
        throw new AppError("Invalid Credentials", 401);
    }

    const passwordMatch = await bcrypt.compare(password, userInfo.password);
    if(!passwordMatch){
        throw new AppError("Invalid Credentials", 401);
    }
    
    const accessToken = generateToken.generateAccessToken(userInfo);
    const refreshToken = generateToken.generateRefreshToken(userInfo);

    const decoded = jwt.decode(refreshToken);
    const response = await storeInDB(userInfo.id, refreshToken, decoded.exp);

    return {accessToken, refreshToken};
}

const logout = async (refreshToken) => {
    const [rows] = await pool.query(
    `DELETE FROM refresh_tokens WHERE token = ?`,
    [refreshToken]
  );
  if(rows.affectedRows === 0){
    throw new AppError('Bad Request', 400)
  }
  return rows
}

const handleRefreshToken = async (token) => {
    if(!token){
        throw new AppError("Refresh token not present", 403);
    }

    const [isPresent] = await pool.query(`SELECT * FROM refresh_tokens WHERE token = ?`, [token])

    if(isPresent.length === 0){
        throw new AppError("Invalid refresh token", 403)
    }

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET_KEY);

    const newAccessToken = generateToken.generateAccessToken(decoded)

    return newAccessToken;
}
module.exports = {register, login, logout, handleRefreshToken}