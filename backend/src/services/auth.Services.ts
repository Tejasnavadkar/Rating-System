import prisma from "../prismaClient"

interface createUserType {
    name:string,
    email:string,
    hashedPassword:string,
    address?:string,
    role?:"ADMIN" | "USER" | "OWNER"
}

export const createUser = async (payload:createUserType) => {
    const createdUser = await prisma.user.create({
        data:{
            name:payload.name,
            email:payload.email,
            password:payload.hashedPassword,
            address:payload.address ?? "",
            role:payload.role
        }
    })

    return createdUser
}