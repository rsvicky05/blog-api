const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
    const token =  jwt.sign(
        {id: userId, role},
        process.env.SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    return token;
}

module.exports = generateToken;