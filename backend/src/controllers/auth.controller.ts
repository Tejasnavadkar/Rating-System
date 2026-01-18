import {Request,Response} from 'express'
import { loginSchema, signupInputType, signupSchema } from '../utils/zodTypes'
import prisma from '../prismaClient'
import { HashPassword } from '../utils/hashPassword'
import { createUser } from '../services/auth.Services'
import { generateJwt } from '../utils/jwtHandler'
import { comparePassword } from '../utils/comparePassword'


type signupReqType = Request<{},any,signupInputType>
type loginREqType = Request<{},any,Pick<signupInputType,'email' | 'password'>> // pick only email and password

const signupController = async (req:signupReqType,res:Response)=>{
  
    try {

     const {email,name,password,address,role} = req.body
    const result = signupSchema.safeParse(req.body)

    if(!result.success) {
        return res.status(400).json({error:result.error.flatten()})
    }

   const isUserExist = await prisma.user.findUnique({where:{
        email:email
    }})

    const hashedPassword = await HashPassword(password)

    if(isUserExist){
        return res.status(403).json({ message: 'user already exist' })
    }

  const payload = {
            name:name,
            email:email,
            hashedPassword:hashedPassword,
            address:address,
            role:role
  }

    // db call
   const createdUser = await createUser(payload)

      if (!createdUser) {
        return res.status(401).json({
            message: 'unable to create user'
        })
    }

    const jwtPayload = {
        id: createdUser.id,
        email: createdUser.email
    }

    // todo : generate token


    const jwtToken = generateJwt(jwtPayload)

    console.log(createdUser)
    res.status(200).json({
        msg:"user Created..",
        user:createdUser,
        jwtToken
    })


    } catch (error) {
       if (error instanceof Error) {
           console.log("error in signupController:--",error)
          return res.status(500).json({
            message: 'Error while signup',
            error: error.message
        })
       } else {
           throw new Error(String(error));
       }
    }

}

const loginController = async (req:loginREqType,res:Response) => {
   try {
    const body = req.body
    // const result =  loginSchema.safeParse(body)

    //  if(!result.success) {
    //     return res.status(400).json({error:result.error.flatten()})
    // }

     const isUserExist = await prisma.user.findUnique({where:{
        email:body.email
    }})

    if(!isUserExist){
        return res.status(403).json({ message: 'wrong credentials' })
    }

    const hashedPassword = isUserExist.password

    const isMatch = await comparePassword(hashedPassword,body.password)

    if(!isMatch){
        return res.status(403).json({ message: 'wrong credentials' })
    }

      const jwtPayload = {
        id: isUserExist.id,
        email: isUserExist.email
    }
    const jwtToken = generateJwt(jwtPayload)

    res.status(200).json({
        msg:"user logedIn..",
        user:isUserExist,
        jwtToken
    })

   } catch (error) {
    if (error instanceof Error) {
           console.log("error in signupController:--",error)
            return res.status(500).json({
            message: 'Error while login',
            error: error.message
        })
       } else {
           throw new Error(String(error));
       }
   }
}

export default {
    signupController,
    loginController
}