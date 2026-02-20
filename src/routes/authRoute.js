const express = require('express');
const validate = require('../middlewares/validateMiddleware')
const router = express.Router();

const {registerUser, loginUser} = require('../controller/authController');

router.post('/register', validate(['first_name', 'email', 'password']), registerUser);

router.post('/login', validate(['email', 'password']), loginUser)

module.exports = router;