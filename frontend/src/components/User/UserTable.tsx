import React, { useEffect, useState } from 'react'
import apiClient from '../../shared/libs/apiClient'
import { useStore } from '../../context/Context'
import Loader from '../Common/Loader'
import axios from 'axios'

type storeType = {
                    id: number,
                    name: string,
                    email: string,
                    address: string,
                    overAllRating: number,
                    ownerId: number,
                    createdAt: Date,
                    updatedAt: Date
}

type ratingType = {
                id: number,
                userId: string,
                storeId: number,
                value: number,
                createdAt: Date,
                updatedAt: Date
}


interface usersType  {
            id: number,
            name: string,
            email: string,
            password: string,
            address: string,
            role:string,
            ratings:ratingType[],
            stores:storeType[],
            createdAt?: Date,
            updatedAt?: Date
        }

const UserTable = () => {
     const [sortField,setSortField] = useState("")
      const [sortOrder,setSortOrder] = useState("")
     const [searchInput,setSearchInput] = useState("")
     const [users,setUsers] = useState<usersType[] | null>(null)

     const {setTotalUsers,setTotalUsersSubmittedRating,isLoading,setLoading} = useStore()
      const tableHeadings:string[] = ['Name', 'Email','Address','Role']

     const fetchUsers = async () => {
          try {
            const response = await apiClient.get('/api/user/getAllUsers',{
            params:{
                filter:searchInput
            }
           })

           if(response.status === 201){
          setUsers(response.data.user)
          setLoading(false)
     }
          }catch (error: unknown) {
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
                 const totalUsersLength:number = users?.length
                 const userswithratings:number = users?.filter((user)=>user.ratings.length > 0).length
                 setTotalUsers(totalUsersLength)
                 setTotalUsersSubmittedRating(userswithratings)
                },[users])

       // search debouncing
       useEffect(()=>{
        const timerId = setTimeout(()=>{
           fetchUsers()
         },500)
     
         return ()=> clearTimeout(timerId)
       },[searchInput])


         // sort handler
         const HandleSort = () =>{
              let sortedUsers = []
             if(sortOrder ===  'asce'){
              sortedUsers = [...users]?.sort((a,b)=>a[sortField].localeCompare(b[sortField]))
             }
       
             if(sortOrder === 'desce'){
                sortedUsers = [...users]?.sort((a,b)=> b[sortField].localeCompare(a[sortField]))
             }
             setUsers(sortedUsers)
         }
       
         // sort effect
         useEffect(()=>{
           console.log({sortField,sortOrder})
           if(sortField !== "" && sortOrder !== ""){
             HandleSort()
           }
         },[sortField,sortOrder])

       const HandleSearch = async (e:React.ChangeEvent<HTMLInputElement>) => {
              setSearchInput(e.target.value)
         }

        // set sort order and field
        const handleSortField = (e:React.ChangeEvent<HTMLInputElement>) =>{
          setSortField(e.target.value)
        }
        const handleSortOrder = (e:React.ChangeEvent<HTMLInputElement>) =>{
           setSortOrder(e.target.value)
        }
  
  if(isLoading){
    return <Loader/>
  }

  return (
    <div>
        <div className='text-lg font-semibold text-center'>Users</div>
        <div>
         <div className='flex justify-between'>
           <div className='w-[35%]'>
            <input 
            type="text" 
            value={searchInput}
            onChange={HandleSearch}
            placeholder='search by name/email' 
            className='border rounded-md outline-none w-full py-1 px-1' />
          </div>
          <div className='flex gap-1 w-[25%]'>
            <div>Sort:</div>
            <div>
              <select className='border px-1 rounded-md' value={sortField} onChange={handleSortField} >
                 <option value="" disabled={true} >none</option>
                 <option value="name">Name</option>
                 <option value="email">Email</option>
               </select>   
            </div>
            <div>
              <select className='border px-1 rounded-md' value={sortOrder} onChange={handleSortOrder} >
                 <option value="" disabled={true} >none</option>
                 <option value="asce">Ascending</option>
                 <option value="desce">Descending</option>
               </select>   
            </div>
          </div>
         </div>

            {/* table */}
          <div className='mt-4 '>
             {users && <table className="w-full table-auto  rounded-xl border border-gray-400" >
              <thead className="bg-gray-200  ">
                <tr className=''>
                  {tableHeadings.map((heading,idx)=>(<th key={idx} className="text-left px-4 py-2">{heading}</th>))}
                </tr>
              </thead>
              <tbody className=''>
                  {
                    users.map((item,idx)=>(<tr key={idx} className="border-t border-gray-300 hover:bg-gray-50">
                      <td className="px-4 py-2">{item?.name}</td>
                      <td className="px-4 py-2">{item?.email}</td>
                      <td className="px-4 py-2">{item?.address}</td>
                      <td className="px-4 py-2">{item?.role}</td>
                    </tr>))
                  }
              </tbody>
             </table>}
          </div>
        </div>
    </div>
  )
}
export default UserTable
