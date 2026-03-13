const express = require('express');
const validate = require('../middlewares/validateMiddleware');
//const authenticate = require("../middlewares/authMiddleware");
const router = express.Router();

const {registerUser, loginUser, logoutUser, refreshTokenHandler, oAuthLogin} = require('../controller/authController');

//router.get('/google', oAuthLogin);

router.post('/register', validate('first_name', 'email', 'password'), registerUser);

router.post('/login', validate('email', 'password'), loginUser)

router.delete('/logout', logoutUser);

router.get('/refresh', refreshTokenHandler);

module.exports = router;