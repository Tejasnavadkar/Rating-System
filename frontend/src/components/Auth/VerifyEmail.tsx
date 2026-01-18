import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../../shared/libs/apiClient';

interface emailType {
    email:string
}

const VerifyEmail = () => {

     const [email, setEmail] = useState<emailType>({
    email: "",
  });
  const [responseError,setResponseError] = useState<string | null>(null)

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setEmail({
        email:value
    })
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    try {
        e.preventDefault()
        setLoading(true)
        const response = await apiClient.post('/api/user/verifyEmail',email)

        if(response.status == 201){
            setLoading(false)
            alert('email verify successfully..')
            navigate(`/resetPassword/${email.email}`)
        }

    } catch (error) {
        setLoading(false)
        if(axios.isAxiosError(error)){
            setResponseError(error.response?.data.msg)
        }else if(error instanceof Error){
            setResponseError(error.message)
        }else{
            setResponseError(String(error))
        }
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Enter Registered Email</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
             {responseError && <span className="text-sm text-red-600">{ responseError}</span>}  
          </div>
        
          {loading ? (
            <div className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
              <div className="text-center">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 w-6 h-6 text-neutral-tertiary animate-spin fill-brand"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Verify
            </button>
          )}
        </form>
        <p className="mt-4 text-sm text-center text-gray-500">
          <Link to={"/"} className="text-blue-600">
           go back
          </Link>
        </p>
      </div>
    </div>
  )
}

export default VerifyEmail
