import React, { useEffect, useState } from 'react'
import { signupSchema } from '../../shared/zodSchema/ZodeSchema'
import z from 'zod'
import apiClient from '../../shared/libs/apiClient'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineClose } from "react-icons/ai";

interface UserPopUp {
    CreateUserPopUp:boolean,
    setCreateUserPopUp:React.Dispatch<React.SetStateAction<boolean>>
}

type Role = "ADMIN" | "USER" | "OWNER"

interface userInfoType {
        name: string,
        email: string,
        password: string,
        address: string,
        role: Role
}

const UserPopup = ({CreateUserPopUp,setCreateUserPopUp}:UserPopUp) => {

      const [userInfo,setUserInfo] = useState<userInfoType>({
         name: "",
        email: "",
        password: "",
        address: "",
        role: "USER"
    })

    const [fieldErrors,setFieldErrors] = useState<z.ZodFormattedError<userInfoType> | null>(null)
    const navigate =  useNavigate()
    const [responseError,setResponseError] = useState<string | null>(null)

     useEffect(() => {
    if (CreateUserPopUp) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [CreateUserPopUp])

  if (!CreateUserPopUp) return null

  const HandleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    
    try {
        e.preventDefault()
    const result = signupSchema.safeParse(userInfo)
  
    if(!result.success){
         setFieldErrors(result.error?.format())
         return
    }

    // api call

    console.log(userInfo)
     
    const response = await apiClient.post('/api/auth/signup',userInfo)

    if(response.status == 200){
        alert(`${response.data.user.role} created succefully`)
        setCreateUserPopUp(false)
        window.location.reload()

    }


    } catch (error: unknown) {

  if (axios.isAxiosError(error)) {
   setResponseError(error.response?.data?.message);
  } else if (error instanceof Error) {
    setResponseError(error.message);
  } else {
    setResponseError("Unexpected error");
  }
}
   
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
       setUserInfo(prev=>({
        ...prev,
        [e.target.name]:e.target.value
       }))
  }

  return (
    <>
    {CreateUserPopUp && ( <div className='bg-black opacity-80 absolute left-0 right-0 top-0 bottom-0 z-50 h-full'></div>)}
      <div className='fixed top-0 h-full right-0 left-0 z-50 border flex justify-center items-center'>
         <button onClick={()=>setCreateUserPopUp(false)} className='text-white absolute top-5 right-7 cursor-pointer'><AiOutlineClose /></button>
       <div className='w-[400px] '>
                    <form noValidate onSubmit={HandleSubmit}  className="space-y-5 bg-white rounded-md p-10 ">
                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter name"
                            />
                              {fieldErrors?.name && <span className="text-sm text-red-600">{fieldErrors.name._errors[0]}</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={userInfo.email}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                            {fieldErrors?.email && <span className="text-sm text-red-600">{fieldErrors.email._errors[0]}</span>}
                        </div>
                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={userInfo.password}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                           {fieldErrors?.password && <span className="text-sm text-red-600">{fieldErrors.password._errors[0]}</span>}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium text-gray-950">
                                Address
                            </label>

                            <textarea
                                name="address"
                                onChange={handleChange}
                                value={userInfo.address}
                                className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter address"
                            ></textarea>
                            {fieldErrors?.address && <span className="text-sm text-red-600">{fieldErrors.address._errors[0]}</span>}
                        </div>

                        <div>
                            <select name="role" onChange={handleChange} value={userInfo.role} className="w-full border border-gray-950 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="USER">User</option>
                                <option value="OWNER">Owner</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                             {responseError && <span className="text-sm text-red-600">{ responseError}</span>}  
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            Create
                        </button>
                    </form>
        </div>
    </div>
    </>
    
  )
}

export default UserPopup
