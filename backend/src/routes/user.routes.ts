import express from 'express'
import userController from '../controllers/user.controller'
import { AuthCheckMiddleware } from '../middlewares/authMiddleware'
const router = express.Router()

router.get('/getUser',AuthCheckMiddleware,userController.getUserController)
router.get('/getAllUsers',AuthCheckMiddleware,userController.getAllUsersController)
router.post('/verifyEmail',userController.verifyMailController)
router.post('/resetPassword',userController.resetPasswordController)
router.get('/getUserById/:id',AuthCheckMiddleware,userController.getUserByIdController)


export default router