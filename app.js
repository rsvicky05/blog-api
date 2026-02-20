const express = require('express');
const cookieParser = require('cookie-parser')
const authMiddleware = require('./src/middlewares/authMiddleware');
const handleError = require('./src/middlewares/errorMiddleware');
const app = express();

app.use(express.json(), cookieParser())

app.use('/api/auth', require('./src/routes/authRoute'));

app.use('/api/posts', authMiddleware, require('./src/routes/postRoute'))

app.use(handleError);

module.exports = app;
