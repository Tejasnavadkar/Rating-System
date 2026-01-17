import prisma from "../prismaClient"
import { storeInputType } from "../utils/zodTypes"
// interface dataType {

// }

export const createStoreWithOwner = async (data:storeInputType) => {
        try {
            const {StoreName,StoreEmail,StoreAddress,OwnerName,OwnerEmail,OwnerPassword,OwnerAddress} = data

           const createdStore = await prisma.store.create({
                data:{
                    name:StoreName,
                    email:StoreEmail,
                    address:StoreAddress,
                    owner:{
                        create:{
                            name:OwnerName,
                            email:OwnerEmail,
                            password:OwnerPassword,
                            address:OwnerAddress,
                            role:"OWNER"
                        }
                    }
                },
            })

            return createdStore

        } catch (error) {
            if(error instanceof Error){
                throw new Error(error.message)
            }else{
                throw new Error(String(error))
            }
        }
}