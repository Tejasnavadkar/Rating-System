import prisma from "../prismaClient"



export const getUserById = async (id:number) => {
try {
   const user = await prisma.user.findUnique({
        where:{
            id:id
        },
        select:{
            id:true,
            name:true,
            email:true,
            address:true,
            role:true,
            ratings:{
                select:{
                    id:true,
                    value:true,
                    storeId:true,
                    user:{
                        select:{
                            name:true,
                            email:true
                        }
                    }
                }
            },
            stores:{
                select:{
                    id:true,
                    name:true,
                    email:true,
                    address:true,
                    ratings:{
                        select:{
                    id:true,
                    value:true,
                    storeId:true,
                    user:{
                        select:{
                           id: true,
                            name: true,
                            email: true,
                            address: true
                        }
                    }
                }
                    },
                    overAllRating:true
                }
            },
            

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

