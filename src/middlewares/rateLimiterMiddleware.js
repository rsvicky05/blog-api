const {rateLimit, ipKeyGenerator} = require('express-rate-limit');
const AppError = require('../utils/AppError');

const userLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: (req) => {
        if (req.user?.role === 'admin') return 6;
        return 30;
    },
    keyGenerator: (req) => {
        if (req.user) return String(req.user.id);
        return ipKeyGenerator(req.ip)
    },
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

const authLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { message: "Too many login attempts"},
    standardHeaders: 'draft-8',
    legacyHeaders: false
});

module.exports = {authLimiter, userLimiter};