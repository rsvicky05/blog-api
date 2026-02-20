const bcrypt = require('bcrypt')
const {findByEmail, createUser} = require('../models/User');
const generateToken = require('../utils/generateToken');
const AppError = require('../utils/AppError');

const register = async ({first_name, last_name, email, password, role}) => {
    const existing = await findByEmail(email);

    if(existing){
        throw new AppError("User already registered", 400);
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
    
    const token = generateToken(user.id, user.role);

    return token;  
}

const login = async ({email, password}) => {
    const userInfo = await findByEmail(email);

    if(!userInfo){
        throw new AppError("User is not registered", 400);
    }

    const passwordMatch = await bcrypt.compare(password, userInfo.password);
    if(!passwordMatch){
        throw new AppError("Unauthorized Access!!", 401);
    }
    
    const token = await generateToken(userInfo.id, userInfo.role);
    return token;
}

const logout = async (user) => {
    
}

module.exports = {register, login, logout}