const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
    }
    const token =  jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN }
    )
    return token;
}

const generateRefreshToken = (user) => {
    const payload = {
        id: user.id,
        role: user.role,
        first_name: user.first_name,
        last_name: user.last_name
    }
    const token =  jwt.sign(
        payload,
        process.env.REFRESH_SECRET_KEY,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
    )
    return token;
}

module.exports = { generateAccessToken, generateRefreshToken};