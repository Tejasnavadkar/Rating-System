import React, { useEffect, useState } from 'react'
import NavBar from '../Common/NavBar'
import apiClient from '../../shared/libs/apiClient'

interface storeType {
           id: number,
            name: string,
            email: string,
            address: string,
            overAllRating: number,
            ownerId: number,
            createdAt: Date,
            updatedAt: Date
}

interface ratingType {
            id: number,
            userId: number,
            storeId: number,
            value: number,
            createdAt: Date,
            updatedAt: Date
}

interface userType {
        id: number,
        name: string,
        email: string,
        password: string,
        address: string,
        role: string,
        createdAt: Date,
        updatedAt: Date
}

const User = () => {

  const tableHeadings:string[] = ['Store Name','Address','OverAll Rating','My Ratings','Actions']

  const [stores,setStores] = useState<storeType[] | null>(null)
  const [ratings,setRatings] = useState<ratingType[] | null>(null)
  const [rateValue,setRateValue] = useState<{[key:number]:number}>({})
  const [currentUser,setCurrentUser] = useState<userType | null>(null)
  const [searchInput,setSearchInput] = useState("")
  // const [sortPayload,setSortPayload] = useState({
  //   sortField:"",
  //   sortOrder:""
  // })

  const [sortField,setSortField] = useState("")
  const [sortOrder,setSortOrder] = useState("")

  const HandleSearch = async (e:React.ChangeEvent<HTMLInputElement>) => {
       setSearchInput(e.target.value)
  }

  const fetchStores = async () => {
     try {
      const response = await apiClient.get('/api/store/getAllStores',{
  params: {
    filter: searchInput
  }
})
     if(response.status === 201){
          setStores(response.data.stores)
     }
     } catch (error) {
       if(error instanceof Error){
        console.log(`[error in fetching stores]:${error.message}`)
       }else{
        console.log(`[error in fetching stores]:${String(error)}`)
       }
     }
  }

  const fetchRatings = async () => {
    try {
        const response = await apiClient.get('/api/rating/getAllRatingsByUserId')
     if(response.status === 201){
          setRatings(response.data.allRatings)
     }
    } catch (error) {
       if(error instanceof Error){
        console.log(`[error in fetching Ratings]:${error.message}`)
       }else{
        console.log(`[error in fetching Ratings]:${String(error)}`)
       }
    }
  }

  useEffect(()=>{
      fetchStores()
  },[])

   useEffect(()=>{
      fetchRatings()
  },[])

  useEffect(()=>{
    const initialRatings:{[key:number]:number} = {}

    ratings?.forEach((item)=>{
      initialRatings[item.storeId] = item.value
    })

    setRateValue(initialRatings)

  },[ratings])

  // search debouncing
  useEffect(()=>{
   const timerId = setTimeout(()=>{
      fetchStores()
    },500)

    return ()=> clearTimeout(timerId)
  },[searchInput])


  // get & set current user
  useEffect(()=>{
     const userString = localStorage.getItem("logedInUser")

     if (userString) {
       const user: userType = JSON.parse(userString)
       setCurrentUser(user)
     }
  },[])

  const getMyRating = (storeId:number) => {
    const rating = ratings?.find((item)=>item.storeId == storeId)
    return rating?.value
  }

  const handleChange = (storeId:number,e:React.ChangeEvent<HTMLInputElement>) => {
    const value:number = parseInt(e.target.value)
      setRateValue(prev=>{
        return {
          ...prev,
          [storeId]:value
        }
      })
  }

  const modifyRating = async (storeId:number) => {
     try {
      console.log(rateValue[storeId])

      if(rateValue[storeId] < 1 || rateValue[storeId] > 5 ){
        return alert('rating should be 1 - 5')
      }
      // api call
      
      const payload = {
         storeId:storeId,
        value:rateValue[storeId]
      }
      const response = await apiClient.post('/api/store/rateStore',payload)

      if(response.status == 200){
           setRateValue(prev=>{
            return {
              ...prev,
              [storeId]:response.data.updatedRating.value
            }
           })
           await fetchStores()
           await fetchRatings()
           alert('rating submited...')
      }

     } catch (error) {
      if(error instanceof Error){
        console.log(`[err in modifyRating]:${error.message}`)
      }else{
        console.log(`[err in modifyRating]:${String(error)}`)
      }
     }
  }

  // set sort order and field
  const handleSortField = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSortField(e.target.value)
  }
  const handleSortOrder = (e:React.ChangeEvent<HTMLInputElement>) =>{
     setSortOrder(e.target.value)
  }

  // sort handler
  const HandleSort = () =>{
       let newStores = []
      if(sortOrder ===  'asce'){
       newStores = [...stores]?.sort((a,b)=>a[sortField].localeCompare(b[sortField]))
      }

      if(sortOrder === 'desce'){
         newStores = [...stores]?.sort((a,b)=> b[sortField].localeCompare(a[sortField]))
      }
      setStores(newStores)
  }

  // sort effect
  useEffect(()=>{
    console.log({sortField,sortOrder})
    if(sortField !== "" && sortOrder !== ""){
      HandleSort()
    }
  },[sortField,sortOrder])
  

  
  return (
    <div>
      {/* navbar */}
      <div>
        <NavBar/>
      </div>
      
      <div className='w-[90%] mx-auto'>
        <div className='text-xl font-semibold text-center my-16'>
         User Dashboard
        </div>
        {/* userinfo */}
       <div>
        <div>
          <div className='flex gap-2'>
            <span className='font-semibold'>Name:-</span>
            <span>{currentUser?.name || 'N/A'}</span>
          </div>
          <div className='flex gap-2'>
            <span className='font-semibold'>Email:-</span>
            <span>{currentUser?.email || 'N/A'}</span>
          </div>
          <div className='flex gap-2'>
            <span className='font-semibold'>Address:-</span>
            <span>{currentUser?.address || 'N/A'}</span>
          </div>
        </div>
      </div>
      {/* stores */}
      <div className='mt-16'>
        <div className='text-lg font-semibold'>Rate Stores</div>
        {stores ? (<div>
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
             <table className="w-full table-auto  rounded-xl border border-gray-400" >
              <thead className="bg-gray-200  ">
                <tr className=''>
                  {tableHeadings.map((heading,idx)=>(<th key={idx} className="text-left px-4 py-2">{heading}</th>))}
                </tr>
              </thead>
              <tbody className=''>

                {
                  stores?.map((item,idx)=>{
                    return <tr key={idx} className="border-t border-gray-300 hover:bg-gray-50">
                  <td className="px-4 py-2">{item?.name}</td>
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">{item.overAllRating}</td>
                  {/* <td className="px-4 py-2">{getMyRating(item.id) || 0}</td> */}
                    <td className="px-4 py-2">
                    <input 
                    type="number" 
                    // value={getMyRating(item.id)}
                    value={rateValue[item.id] || ""}
                    onChange={(e)=>handleChange(item.id,e)}
                    placeholder='1-5' 
                    className='outline-none border border-gray-400' 
                    />
                    </td>
                  <td className="px-4 py-2">
                   <button onClick={()=>modifyRating(item.id)} className='bg-green-600 text-white px-2 py-1 rounded-md'>{getMyRating(item.id) ? "update" : "submit"}</button>
                  </td>
                 </tr>
                  })
                }
               
              </tbody>
             </table>
          </div>
        </div>) : (<div className='text-lg text-center font-semibold'>Stores not found...</div>)}
      </div>
      </div>
    </div>
  )
}

export default User
