import {Request,Response} from 'express'
import { storeInputType, storeSchema } from "../utils/zodTypes"
import { HashPassword } from '../utils/hashPassword'
import { createStoreWithOwner } from '../services/store.Services'
import prisma from '../prismaClient'

interface RateStoreBody {
  storeId: number; // or string, depending on your schema
  value: number;
}

interface CustomRequest extends Request {
  userId?: number;
  body:RateStoreBody
}



type rateStoreReqType = Request<{},any,{storeId:string,value:string}>

type createStoreReqType = Request<{},any,storeInputType>

const createStoreController = async (req:createStoreReqType,res:Response) => {

    try {
        const body = req.body

       const result = storeSchema.safeParse(body)
        if(!result.success){
           return res.status(400).json({
           error:result.error.flatten()
       });
        }

        //check if Store Name already exist
        const storeNameExist = await prisma.store.findUnique({
            where:{
                name:body.StoreName
            }
        })

        if(storeNameExist){
                return res.status(400).json({
           message:'store name already exists'
       })
        }
        
        //check if store already exist
       const storeExist = await prisma.store.findUnique({
            where:{
                email:body.StoreEmail
            }
        })
         
        if(storeExist){
             return res.status(400).json({
           message:'store already exists'
       })
        }

         //check if owner already exist
   const ownerExist = await prisma.store.findUnique({
     where:{
        email:body.OwnerEmail
    }
   })

      if(ownerExist){
       return res.status(400).json({
           message:'owner already exists'
       })
   }

       const ownerHashPassword = await HashPassword(body.OwnerPassword)

    //    create store with user(owner)
     const storePayload = {
        StoreName:body.StoreName,
        StoreEmail:body.StoreEmail,
        StoreAddress:body.StoreAddress,
        OwnerName:body.OwnerName,
        OwnerEmail:body.OwnerEmail,
        OwnerPassword:ownerHashPassword,
        OwnerAddress:body.OwnerAddress
    }

    const createStore = await createStoreWithOwner(storePayload)

    return res.status(201).json({
       message: 'Store created successfully',
       store: createStore
   });

    } catch (error) {
         if(error instanceof Error){
                return res.status(500).json({
                     message: 'Error while store creation',
                    error: error.message
                })
            }else{
                throw new Error(String(error))
            }
    }

}

const getAllStoreController = async (req:Request | rateStoreReqType,res:Response) => {

   try {
    const filter:string = typeof req.query.filter == 'string' ? req.query.filter  :  ""
       const allStore = await prisma.store.findMany({
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
            stores: allStore
        })
   
   } catch (error) {
     if(error instanceof Error){
                return res.status(500).json({
                     message: 'Error while store creation',
                    error: error.message
                })
            }else{
                throw new Error(String(error))
            }
   }

}

const rateStore = async (req:CustomRequest,res:Response) => {
    try {
        const {storeId,value} = req.body
        const userId = req.userId
        
       const isStoreExist = await prisma.store.findUnique({
            where:{
                id:storeId
            }
        })

        if(!isStoreExist){
            return res.status(404).json({
                msg:'store not exist'
            })
        }
    } catch (error) {
         if(error instanceof Error){
                return res.status(500).json({
                     message: 'Error while store creation',
                    error: error.message
                })
            }else{
                throw new Error(String(error))
            }
   
    }
}

export default {
    createStoreController,
    getAllStoreController
}