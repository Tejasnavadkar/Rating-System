import express from 'express'
import { AuthCheckMiddleware } from '../middlewares/authMiddleware'
import storeController from '../controllers/store.controller'
const router = express.Router()


router.post('/createStore',AuthCheckMiddleware,storeController.createStoreController)
router.get('/getAllStores',AuthCheckMiddleware,storeController.getAllStoreController)
router.post('/rateStore',AuthCheckMiddleware,storeController.rateStoreController)


export default router