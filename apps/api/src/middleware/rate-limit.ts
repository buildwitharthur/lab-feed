import { rateLimit } from 'express-rate-limit'

export const apiRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: 'Too many requests. Try again later.',
    },
})
