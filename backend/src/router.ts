import express from 'express'
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import storeRouter from './routes/store.routes'
const router = express.Router()


router.use("/api/auth",authRouter)
router.use("/api/user",userRouter)
router.use("/api/store",storeRouter)

export default router
