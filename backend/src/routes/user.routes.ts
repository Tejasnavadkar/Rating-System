import express from 'express'
import userController from '../controllers/user.controller'
import { AuthCheckMiddleware } from '../middlewares/authMiddleware'
const router = express.Router()

router.get('/getUser',AuthCheckMiddleware,userController.getUserController)
router.get('/getAllUsers',AuthCheckMiddleware,userController.getAllUsersController)


export default router