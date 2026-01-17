import React, { useEffect, useState } from 'react'
import { createStoreSchema } from '../../shared/zodSchema/ZodeSchema'
import z from 'zod'
import apiClient from '../../shared/libs/apiClient'

interface StorePopUp {
    CreateStorePopUp:boolean,
    setCreateStorePopUp:React.Dispatch<React.SetStateAction<boolean>>
}

interface storeInfo {
    StoreName:string,
    StoreEmail:string,
    StoreAddress:string,
    OwnerPassword:string,
    OwnerName:string,
    OwnerEmail:string,
    OwnerAddress:string
}

const StorePopUp = ({CreateStorePopUp,setCreateStorePopUp}:StorePopUp) => {

    const [storeInfo,setStoreInfo] = useState<storeInfo>({
        
    StoreName:"",
    StoreEmail:"",
    StoreAddress:"",
    OwnerPassword:"",
    OwnerName:"",
    OwnerEmail:"",
    OwnerAddress:""
    })

    const [fieldErrors,setFieldErrors] = useState<z.ZodFormattedError<storeInfo> | null>(null)

    useEffect(()=>{
        if(CreateStorePopUp){
             document.body.style.overflow = 'hidden'
        }

          return () => {
            document.body.style.overflow = 'auto'
         }
    },[CreateStorePopUp])

    if(!CreateStorePopUp) return null

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        
        setStoreInfo(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }


     const HandleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      try {
       const result = createStoreSchema.safeParse(storeInfo)

       if(!result.success){
            setFieldErrors(result.error.format())
       }

    //    api call

    const response = await apiClient.post('/api/store/createStore',storeInfo)

     if(response.status == 201){
        alert(`store created succefully`)
        setCreateStorePopUp(false)
        window.location.reload()

    }

      } catch (error) {
        if(error instanceof Error){
        throw new Error(error.message)
       }else{
         throw new Error(String(error))
    }
      }
  }

  return (
   <>
    {CreateStorePopUp && ( <div className='bg-black opacity-80 absolute left-0 right-0 top-0 bottom-0 z-50 h-full'></div>)}
      <div className='h-screen fixed top-0 left-0 right-0 flex justify-center items-center z-100'>
         <button onClick={()=>setCreateStorePopUp(false)} className='text-white absolute top-5 right-7 cursor-pointer'>X</button>
      <div className='w-[800px] '>
                    <form noValidate onSubmit={HandleSubmit}  className="space-y-5 bg-white rounded-md p-10 ">
                        <div className="block mb-1 font-medium text-gray-950">
                            Store Info
                        </div>
                        <div className='w-full grid grid-cols-2 gap-2  ' >
                            <div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Store Name
                                    </label>
                                    <input
                                        type="text"
                                        name="StoreName"
                                        value={storeInfo.StoreName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter name"
                                    />

                                   {fieldErrors?.StoreName && <span className="text-sm text-red-600">{fieldErrors.StoreName._errors[0]}</span>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Store Email
                                    </label>
                                    <input
                                        type="email"
                                        name="StoreEmail"
                                        value={storeInfo.StoreEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="you@example.com"
                                    />
                                    {fieldErrors?.StoreEmail && <span className="text-sm text-red-600">{fieldErrors.StoreEmail._errors[0]}</span>}
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Store Address
                                    </label>

                                    <textarea
                                        name="StoreAddress"
                                        onChange={handleChange}
                                        value={storeInfo.StoreAddress}
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                    ></textarea>
                                    {fieldErrors?.StoreAddress && <span className="text-sm text-red-600">{fieldErrors.StoreAddress._errors[0]}</span>}
                                </div>
                            </div>

                            <div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Name
                                    </label>
                                    <input
                                        type="text"
                                        name="OwnerName"
                                        value={storeInfo.OwnerName}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter name"
                                    />
                                     {fieldErrors?.OwnerName && <span className="text-sm text-red-600">{fieldErrors.OwnerName._errors[0]}</span>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Email
                                    </label>
                                    <input
                                        type="email"
                                        name="OwnerEmail"
                                        value={storeInfo.OwnerEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="you@example.com"
                                    />
                                    {fieldErrors?.OwnerEmail && <span className="text-sm text-red-600">{fieldErrors.OwnerEmail._errors[0]}</span>}
                                </div>
                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Password
                                    </label>
                                    <input
                                        type="password"
                                        name="OwnerPassword"
                                        value={storeInfo.OwnerPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="••••••••"
                                    />
                                     {fieldErrors?.OwnerPassword && <span className="text-sm text-red-600">{fieldErrors.OwnerPassword._errors[0]}</span>}
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium text-gray-950">
                                        Owner Address
                                    </label>

                                    <textarea
                                        name="OwnerAddress"
                                        onChange={handleChange}
                                        value={storeInfo.OwnerAddress}
                                        className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter address"
                                    ></textarea>
                                  {fieldErrors?.OwnerAddress && <span className="text-sm text-red-600">{fieldErrors.OwnerAddress._errors[0]}</span>}

                                </div>

                                {/* <div>
                                    <select  name="role" id="" className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="USER">User</option>
                                        <option value="OWNER">Owner</option>
                                        <option value="ADMIN">Admin</option>
                                    </select>
                                </div> */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
    </div>
    </>
  )
}

export default StorePopUp
