const express = require('express');
const validate = require('../middlewares/validateMiddleware')
const authenticate = require("../middlewares/authMiddleware")
const router = express.Router();

const {registerUser, loginUser, logoutUser, refreshTokenHandler} = require('../controller/authController');

router.post('/register', validate(['first_name', 'email', 'password']), registerUser);

router.post('/login', validate(['email', 'password']), loginUser)

router.delete('/logout', logoutUser);

router.post('/refresh', refreshTokenHandler);

module.exports = router;