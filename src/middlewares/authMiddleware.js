const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const checkToken = async (req, res, next) => {
    try{
        const token = req.cookies.accessToken;
        
        if(!token){
            return res.status(401).send("Unauthorized Access");
        }

        const verified = await jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = verified;
        next();
    }catch(err){
        if(err.name === "TokenExpiredError"){
            throw new AppError("Session Expired", 401);
        }
        throw new AppError("Unauthorized Access", 401);
    }
}

module.exports = checkToken;