import {Request,Response} from 'express'
import prisma from '../prismaClient'

interface getRatingByUserIdType extends Request {
    userId?:number
}

const getAllRatingController = async (req:Request,res:Response) => {
        try {

           const allRatings = await prisma.rating.findMany({})

           return res.status(201).json({
            msg:'all ratings',
            allRatings
           })
            
        } catch (error) {
      if(error instanceof Error){
       return res.status(500).json({msg:error.message})
       }else{
       return res.status(500).json({msg:String(error)})
       }
        }
}

const getRatingByUserIdController = async (req:getRatingByUserIdType,res:Response) => {
        try {
            const userId = req.userId
           const allRatings = await prisma.rating.findMany({
            where:{
                userId:userId
            }
           })

           return res.status(201).json({
            msg:'all ratings',
            allRatings
           })
            
        } catch (error) {
      if(error instanceof Error){
       return res.status(500).json({msg:error.message})
       }else{
       return res.status(500).json({msg:String(error)})
       }
        }
}


export default{
    getAllRatingController,
    getRatingByUserIdController
}