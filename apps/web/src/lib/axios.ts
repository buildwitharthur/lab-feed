import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3333',
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    },
)
