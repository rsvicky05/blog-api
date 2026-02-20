const AppError = require('../utils/AppError')
function authorize(...allowedRoles){
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            throw new AppError("Access denied. Insufficient Permission", 403);
        }
        next();
    };
}

module.exports = authorize;