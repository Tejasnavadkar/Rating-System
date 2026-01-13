import { truncates } from 'bcryptjs'
import jwt ,{JwtPayload} from 'jsonwebtoken'

interface VerifyTokenResult {
    payload?: string | JwtPayload;
}

// interface
export const generateJwt = (jwtPayload:JwtPayload) => {

    try {

        if(!process.env.JWT_SECRET) {
            throw new Error(`jwt not find`)
        }
        const token = jwt.sign(jwtPayload,process.env.JWT_SECRET)

        return token
    } catch (error) {
        if (error instanceof Error) {
           console.log("error while:--",error)
           throw new Error(error.message);
       } else {
           throw new Error(String(error));
       }
    }
}



export const verifyToken = (token: string): string | JwtPayload => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error(`jwt not find`);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (error) {
      if( error instanceof Error){
           console.log('err in verify token',error)
       throw new Error(error.message)  
      }  else{
        throw new Error(String(error)) 
      }
    }
};