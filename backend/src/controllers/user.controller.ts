import {Request,Response} from 'express'
import { getUserById } from '../services/user.Services'
import prisma from '../prismaClient';
import { HashPassword } from '../utils/hashPassword';
import { resetPasswordSchema } from '../utils/zodTypes';


interface CustomRequest extends Request {
  userId?: number;
}

interface verifyMailRequest extends Request {
 body:{
    email:string
 }
}

interface resetPasswordRequest extends Request {
 body:{
    email:string,
    newPassword:string
 }
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


const verifyMailController = async (req:verifyMailRequest,res:Response) => {
    try {
        const {email} = req.body

       const isuserExist = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!isuserExist){
            return res.status(404).json({
                msg:'email not exist'
            })
        }

       return res.status(201).json({
            msg:'email verified successfully'
        })

    } catch (error) {
         if(error instanceof Error){
            console.log("verifymail-",error.message)
          return res.status(500).json({
            message: 'Error verifing user email',
            error: error.message
        })
    }else{
        throw new Error(String(error));
    }
    }
}

const resetPasswordController = async (req:resetPasswordRequest,res:Response)=>{
        try {

           const {email,newPassword} = req.body

          const result = resetPasswordSchema.safeParse({
            email:email,
            password:newPassword
           })

           if(!result.success){
            return res.status(400).json({
                msg:result.error.flatten()
            })
           }
          const user = await prisma.user.findUnique({
            where:{
                email:email
            }
           })

           if(!user){
            return res.status(404).json({
                msg:'email not exist'
            })
           }

           const hashedPassword = await HashPassword(newPassword)

        const updatedUser =  await prisma.user.update({
            where:{
                email:email
            },
            data:{
                password:hashedPassword
            }
           })

             return res.status(201).json({
                 message: 'password updated successfully',
                 updatedUser
            })
            
        } catch (error) {
             if(error instanceof Error){
            console.log("resetPasswordController-",error.message)
          return res.status(500).json({
            message: 'Error reset password',
            error: error.message
        })
    }else{
        throw new Error(String(error));
    }
        }
}

const getUserByIdController = async (req:Request,res:Response) => {

    try {
        const userId = req.params.id 

        if(!userId){
            return res.status(404).json({
                msg:"user not found"
            })
        }

      const user = await prisma.user.findUnique({
        where:{
            id:parseInt(userId)
        }
      })

      if(!user){
        return res.status(404).json({
            msg:'user not found'
        })
      }

        return res.status(200).json({
            user
        })
    } catch (error) {

        if(error instanceof Error){
            return res.status(500).json({
                msg:error.message
            })
        }else{
            throw new Error(String(error))
        }
        
    }
    
}



export default {
    getUserController,
    getAllUsersController,
    verifyMailController,
    resetPasswordController,
    getUserByIdController
}