import React from 'react'
import { useEffect, useState } from 'react'
import apiClient from '../../shared/libs/apiClient'
import { useStore } from '../../context/Context'


interface storeType  {
            id: number,
            name: string,
            email: string,
            overAllRating: number,
            address: string,
            ownerId:number,
            createdAt: Date,
            updatedAt: Date
        }

const StoreTable = () => {

      const [sortField,setSortField] = useState("")
          const [sortOrder,setSortOrder] = useState("")
         const [searchInput,setSearchInput] = useState("")
         const [stores,setStores] = useState<storeType[] | null>(null)
    
          const tableHeadings:string[] = ['Name', 'Email','Address','Ratings']
          const {setTotalStores} = useStore()
    
         const fetchStores = async () => {
              const response = await apiClient.get('/api/store/getAllStores',{
                params:{
                    filter:searchInput
                }
               })
    
               if(response.status === 201){
              setStores(response.data.stores)
         }
         }
    
           // search debouncing
           useEffect(()=>{
            const timerId = setTimeout(()=>{
               fetchStores()
             },500)
         
             return ()=> clearTimeout(timerId)
           },[searchInput])
    

           useEffect(()=>{
            const totalStores:number = stores?.length
            setTotalStores(totalStores)
           },[stores])
    
             // sort handler
             const HandleSort = () =>{
                  let sortedStores = []
                 if(sortOrder ===  'asce'){
                  sortedStores = [...stores]?.sort((a,b)=>a[sortField].localeCompare(b[sortField]))
                 }
           
                 if(sortOrder === 'desce'){
                    sortedStores = [...stores]?.sort((a,b)=> b[sortField].localeCompare(a[sortField]))
                 }
                 setStores(sortedStores)
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


  return (
    <div>
        <div className='text-lg font-semibold text-center'>Stores</div>
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
             {stores && <table className="w-full table-auto  rounded-xl border border-gray-400" >
              <thead className="bg-gray-200  ">
                <tr className=''>
                  {tableHeadings.map((heading,idx)=>(<th key={idx} className="text-left px-4 py-2">{heading}</th>))}
                </tr>
              </thead>
              <tbody className=''>
                  {
                    stores.map((item,idx)=>(<tr key={idx} className="border-t border-gray-300 hover:bg-gray-50">
                      <td className="px-4 py-2">{item?.name}</td>
                      <td className="px-4 py-2">{item?.email}</td>
                      <td className="px-4 py-2">{item?.address}</td>
                      <td className="px-4 py-2">{item?.overAllRating}</td>
                    </tr>))
                  }
              </tbody>
             </table>}
          </div>
        </div>
    </div>
  )
}

export default StoreTable
