import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../../shared/libs/apiClient'
import { json } from 'zod'

interface signInInfoType {
    email:string,
    password:string
}

const LogIn = () => {

   const [signInInfo,setSignInInfo] = useState<signInInfoType>({
        email:"",
        password:""
    })

    const navigate = useNavigate()


      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
            const field = e.target.name 
            const value = e.target.value
            setSignInInfo(prev=>{
                return {
                    ...prev,
                    [field]:value
                }
            })
      }
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       
        try {
        
        e.preventDefault()
    
         console.log(signInInfo)
    
        //   api call (apiClient)
        const response = await apiClient.post('/api/auth/login',signInInfo)
    
        if(response.status == 200){

            console.log("api-response-",response.data)
            localStorage.setItem('token',response.data.jwtToken)
             localStorage.setItem('logedInUser',JSON.stringify(response.data.user))
            const role = response.data.user.role
            
            // role based navigation
            switch(role){
               case "USER":
               navigate('/userDashboard')
               break;

               case "OWNER":
               navigate('ownerDashboard')
               break

               case "ADMIN":
               navigate('adminDashboard')
               break
            }

        }
          
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
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={signInInfo.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={signInInfo.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          Don't have an account? <Link to={'/signup'} className="text-blue-600">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default LogIn
