const jwt = require('jsonwebtoken');

const generateAccessToken = (userId, role) => {
    const token =  jwt.sign(
        {id: userId, role},
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    )
    return token;
}

const generateRefreshToken = (userId, role) => {
    const token =  jwt.sign(
        {id: userId, role},
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
    )
    return token;
}

module.exports = { generateAccessToken, generateRefreshToken};