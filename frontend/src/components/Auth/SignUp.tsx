import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import z from 'zod'


interface signupType {
     name: string,
    email: string,
    password: string,
    address: string,
    role: string
}

const signupSchema = z.object({
  name: z.string().min(20).max(60),
  email: z.email(),
  password: z.string().min(8).max(16).refine(val => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
      message: "Password must contain at least one special character",
    }), // at least one uppercase letter and one special character.
  address: z.string().optional(),
  role: z.enum(['USER', 'ADMIN', 'OWNER']).optional(),
})

const SignUp = () => {

   const [signupInfo,setSignUpInfo] = useState<signupType>({
     name: "",
    email: "",
    password: "",
    address: "",
    role: "USER"
})
const [fieldErrors,setFieldErrors] = useState<
  z.ZodFormattedError<signupType> | null
>(null)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        const field = e.target.name 
        const value = e.target.value
        setSignUpInfo(prev=>{
            return {
                ...prev,
                [field]:value
            }
        })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   
    try {
        e.preventDefault()
        setFieldErrors(null)
       
      const {success,error} = signupSchema.safeParse(signupInfo)

    //   console.log({success:success,data:data,error:error?.format()})

      if(!success){
        setFieldErrors(error.format()) 
        return
      }

     console.log(signupInfo)

    //   api call
    
     


    } catch (error) {
        if(error instanceof Error){
            console.log(`error in handle submit- ${error.message}`)
        }else{
            console.log(String(error))
        }
    }

    
  }

   

  return (
       <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form noValidate onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={signupInfo.name}
                            onChange={(e)=>handleChange(e)}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                        />
                        {fieldErrors?.name && <span className="text-sm text-red-600">{fieldErrors.name._errors[0]}</span>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <input 
                        //    formNoValidate
                            type="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={(e)=>handleChange(e)}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                        {fieldErrors?.email && <span className="text-sm text-red-600">{fieldErrors.email._errors[0]}</span>}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={signupInfo.password}
                            onChange={(e)=>handleChange(e)}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                         {fieldErrors?.password && <span className="text-sm text-red-600">{fieldErrors.password._errors[0]}</span>}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Address
                        </label>

                        <textarea
                            name="address"
                           onChange={(e)=>handleChange(e)}
                            value={signupInfo.address}
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter address"
                        ></textarea>
                        {fieldErrors?.address && <span className="text-sm text-red-600">{fieldErrors.address._errors[0]}</span>}

                    </div>

                    {/* <div>
                        <select onChange={()=>{}} name="role" value={} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="USER">User</option>
                            <option value="OWNER">Owner</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div> */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Already have an account? <Link to={'/'} className="text-blue-600">login</Link>
                </p>
            </div>
        </div>
  )
}

export default SignUp
