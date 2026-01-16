import express from 'express'
import { AuthCheckMiddleware } from '../middlewares/authMiddleware'
import ratingController from '../controllers/rating.controller'
const router = express.Router()

router.get('/getAllRatings',AuthCheckMiddleware,ratingController.getAllRatingController)
router.get('/getAllRatingsByUserId',AuthCheckMiddleware,ratingController.getRatingByUserIdController)



export default router