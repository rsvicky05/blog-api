const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');
const handleError = require('./src/middlewares/errorMiddleware');
const {authLimiter, userLimiter} = require('./src/middlewares/rateLimiterMiddleware');
const app = express();

app.use(require('morgan')('dev'));

app.use(express.json(), cookieParser(), cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/uploads",express.static(path.join(__dirname, "uploads")));

app.use('/api/auth', authLimiter, require('./src/routes/authRoute'));

app.use('/api/posts', userLimiter, require('./src/routes/postRoute'))

//app.use('/api/upload', authMiddleware,  userLimiter, require('./src/routes/uploadRoute'))

app.use(handleError);

module.exports = app;
