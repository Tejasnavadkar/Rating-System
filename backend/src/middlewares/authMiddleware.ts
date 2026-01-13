import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwtHandler"

interface CustomRequest extends Request {
  userId?: number; // or string, depending on your token payload
}


export const AuthCheckMiddleware = (req:CustomRequest,res:Response,next:NextFunction) => {
    
  const authHeader = req.headers.authorization
   console.log('authHeader--',authHeader)

   if(!authHeader){
    return res.status(403).json({message:'token not found'})
   }
  try {
    
  const token = authHeader.split(" ")[1].replace(/"/g,'')  // replace double quotes to single quotes from token double quotes throw error
  
  // verify token
  const decoded = verifyToken(token)
  
if(!decoded){
    return res.status(411).json({msg:'token not valid'})
}

// Check if decoded is an object and has 'id' property
if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
    req.userId = (decoded as { id: number }).id
    next()
} else {
    return res.status(411).json({msg:'token payload invalid'})
}

  } catch (error) {
    // console.log('err in middleware',error)
    //   return res.status(411).json({error:error.message})
    if (error instanceof Error) {
           console.log("error in authMiddleware:--",error)
          return res.status(411).json({
            message: 'Error while authCheck',
            error: error.message
        })
       } else {
           throw new Error(String(error));
       }
  }
}