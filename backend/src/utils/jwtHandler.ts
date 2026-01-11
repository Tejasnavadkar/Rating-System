import { truncates } from 'bcryptjs'
import jwt ,{JwtPayload} from 'jsonwebtoken'

interface VerifyTokenResult {
    valid: boolean;
    payload?: string | JwtPayload;
    error?: unknown;
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
           console.log("error while generate token:--",error)
           throw new Error(error.message);
       } else {
           throw new Error(String(error));
       }
    }
}



export const verifyToken = (token: string): VerifyTokenResult => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error(`jwt not find`);
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        return { valid: true, payload };
    } catch (error) {
        return { valid: false, error };
    }
};