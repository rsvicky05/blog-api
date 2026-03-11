const validator = require('validator');
const AppError = require('../utils/AppError');

const validate = (...requiredFields) => {
    return (req, res, next) => {
        if(!req.body){
            throw new AppError("Required Fields are missing", 400)
        }
        const error = [];
        requiredFields.forEach(element => {
            if(!req.body[element]) {
                error.push(`${element} is required`);
            }
        });
        console.log(error);
        if(error.length > 0){
            return res.status(422).send({errors: error});
        }

        if(requiredFields.includes('email') && req.body.email && !validator.isEmail(req.body.email)){
            throw new AppError("Email Address is Invalid", 422);
        }

        next();
    };
};

module.exports = validate;