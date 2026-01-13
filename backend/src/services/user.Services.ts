import prisma from "../prismaClient"



export const getUserById = async (id:number) => {
try {
   const user = await prisma.user.findUnique({
        where:{
            id:id
        }
    })

    return user
} catch (error) {
    if(error instanceof Error){
        throw new Error(error.message)
    }else{
        throw new Error(String(error));
    }
}
}

