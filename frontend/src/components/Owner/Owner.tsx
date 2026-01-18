import { useEffect, useState } from 'react'
import NavBar from '../Common/NavBar'
import apiClient from '../../shared/libs/apiClient'
import { useStore } from '../../context/Context';
import Loader from '../Common/Loader';
import axios from 'axios';

type Role = "ADMIN" | "USER" | "OWNER"



export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: Role;
  ratings: UserRating[];
  stores: StoreWithRatings[];
}

export interface UserRating {
  id: number;
  value: number;
  storeId: number;
  user: RatingUser;
}

export interface RatingUser {
  name: string;
  email: string;
}

export interface StoreWithRatings {
  id: number;
  name: string;
  email: string;
  address: string;
  ratings: StoreRating[];
  overAllRating: number;
}

export interface StoreRating {
  id: number;
  value: number;
  storeId: number;
  user: StoreRatingUser;
}

export interface StoreRatingUser {
  id: number;
  name: string;
  email: string;
  address: string;
}


const Owner = () => {

  const [currentUser,setCurrentUser] = useState<User | null>(null)
  const {isLoading,setLoading} = useStore()

  const fetchUser = async () => {
      try {
      const response =  await apiClient.get('/api/user/getUser')

      if(response.status == 201){
        setCurrentUser(response.data.user)
        setLoading(false)
      }

      } catch (error: unknown) {
  setLoading(false);

  if (axios.isAxiosError(error)) {
   throw new Error(error.response?.data?.message);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Unexpected error");
  }
}
  } 
  
  useEffect(()=>{
      fetchUser()
  },[])

  
  if(isLoading){
    return <Loader/>
  }

  return (
    <div>
      <nav>
        <NavBar/>
      </nav>
      <div className='w-[85%] mx-auto pt-12'>
                <section>
                    <div className='text-4xl font-semibold text-center'>Store Owner Dashboard</div>
                </section>

                <section className='flex flex-col gap-3 mt-16'>
                    <div className='text-xl'>Store Details</div> {/* get name from local storage/context */}
                    <div>

                        <div className='space-x-2'>
                            <span className='font-bold '>Name:</span>
                            <span>{ currentUser?.name ||  'N/A'}</span>
                        </div>

                        <div className='space-x-2'>
                            <span className='font-bold '>Email:</span>
                            <span>{ currentUser?.email ||  'N/A'}</span>
                        </div>

                        <div className='space-x-2'>
                            <span className='font-bold '>Address:</span>
                            <span>{ currentUser?.address || 'N/A'}</span>
                        </div>
                        <div className='space-x-2'>
                            <span className='font-bold '>Average Rating:</span>
                            <span className=' '>{ currentUser?.stores[0]?.overAllRating || 'N/A'}</span>
                        </div>
                    </div>

                </section>

                {/* Stores Table  */}
                {/* name addres overallrating myrating action  */}
                <section >

                    <div className="p-4 overflow-x-auto mt-16">
                        <h2 className="text-2xl font-bold mb-4">Rate Stores</h2>
                      {(currentUser?.stores?.[0]?.ratings?.length ?? 0)> 0 ? (<table className="w-full table-auto border border-gray-300 rounded-xl">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-left px-4 py-2">User</th>
                                    <th className="text-left px-4 py-2">Rating</th>

                                </tr>
                            </thead>
                            <tbody>
                              {
                                currentUser?.stores[0].ratings.map((rate)=>{
                                  return <tr>
                                    <td className="text-left px-4 py-2">{rate.user.name}</td>
                                    <td className="text-left px-4 py-2">{rate.value}</td>
                                  </tr>
                                })
                              }
                            </tbody>
                        </table>) : (<div className='text-lg text-center font-semibold'>
                          No Rating Available..
                        </div>)}
                    </div>
                </section>
            </div>
    </div>
  )
}

export default Owner
