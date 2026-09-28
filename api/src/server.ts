import cors from 'cors'
import express from 'express'

import { errorHandler } from './middleware/error-handler.js'
import { apiRateLimit } from './middleware/rate-limit.js'

export const app = express()

app.disable('x-powered-by')

app.use(
    cors({
        origin: process.env.WEB_URL ?? 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
)

app.use(express.json())

app.use(apiRateLimit)

app.get('/health', (_request, response) => {
    return response.status(200).json({
        status: 'ok',
    })
})

app.use(errorHandler)

const port = Number(process.env.PORT ?? 3333)

app.listen(port, () => {
    console.log(`HTTP server running on port ${port}`)
})
