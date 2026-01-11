import bcrypt from "bcryptjs";

 export const comparePassword = async (hashedPassword:string,password:string):Promise<Boolean> => {
  const isMatch = await bcrypt.compare(password,hashedPassword)
  return isMatch
}