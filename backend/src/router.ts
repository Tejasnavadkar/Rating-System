import express from 'express'
import authRouter from './routes/auth.routes'
const router = express.Router()


router.use("/api/auth",authRouter)

export default router
