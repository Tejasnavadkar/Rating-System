import {Request,Response} from 'express'
import { getUserById } from '../services/user.Services'
import prisma from '../prismaClient';


interface CustomRequest extends Request {
  userId?: number;
}

const getUserController = async (req:CustomRequest,res:Response) => {
    try {
         const userId = req.userId // from middleware
        

         if(!userId){
            return res.status(404).json({message:'userId not found'})
         }
        const user = await getUserById(userId)

        if (!user) {
            return res.status(401).json({
                message: 'user not found'
            })
        }

        return res.status(201).json({
            user: user
        })
    } catch (error) {
          if(error instanceof Error){
            console.log("getUserController-",error.message)
        return res.status(500).json({
            message: 'Error getting user',
            error: error.message
        })
    }else{
        throw new Error(String(error));
    }
    }
}

const getAllUsersController = async (req:Request,res:Response) => {
    try {
        const filter: string = typeof req.query.filter === 'string' ? req.query.filter : "";
        const allUsers = await prisma.user.findMany({
            where:{
                    OR:[
                        {
                            name:{
                                contains:filter,
                                mode:'insensitive'
                            }
                        },
                        {
                            email:{
                                contains:filter,
                                mode:'insensitive'
                            }
                        },
                        {
                            address:{
                                contains:filter,
                                mode:'insensitive'
                            }
                        }
                    ]
                },
        })

       return res.status(201).json({
            user: allUsers
        })
    } catch (error) {
           if(error instanceof Error){
            console.log("getAllUserController-",error.message)
          return res.status(500).json({
            message: 'Error getting users',
            error: error.message
        })
    }else{
        throw new Error(String(error));
    }
    }
}

// const getUserById = async (req,res) => {

// }

export default {
    getUserController,
    getAllUsersController
}