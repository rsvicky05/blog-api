const jwt = require('jsonwebtoken');

const checkToken = async (req, res, next) => {
    try{
        const auth = req.headers.authorization;

        if(!auth || !auth.startsWith('Bearer')){
            return res.status(401).send("Unauthorized Access");
        }

        const token  = auth.split(' ')[1];

        const verified = await jwt.verify(token, process.env.SECRET_KEY)
        
        req.user = verified;
        next();

    }catch(err){
        if(err.name === "TokenExpiredError"){
            return res.status(401).send("Session Expired");
        }
        return res.status(401).send("Unauthorized Access");
    }
}

module.exports = checkToken;