import React, { useState } from 'react'
import NavBar from '../Common/NavBar'
import UserTable from '../User/UserTable'
import StoreTable from '../Store/StoreTable'
import { useStore } from '../../context/Context'
import UserPopup from '../User/UserPopup'
import StorePopUp from '../Store/StorePopUp'

const Admin = () => {

    const [CreateStorePopUp, setCreateStorePopUp] = useState<boolean>(false)
    const [CreateUserPopUp, setCreateUserPopUp] = useState<boolean>(false)
    const {totalStores,totalUsers,totalUsersSubmittedRating} = useStore()
    // const [users,setusersInAdmin] = useState()

    const StorePopUpToggle = () => {
        setCreateStorePopUp(prev=>!prev)
    }

     const UserPopUpToggle = () => {
       setCreateUserPopUp(prev=>!prev)
    }


  return (
    <div className='relative'>
          {CreateUserPopUp && <UserPopup CreateUserPopUp={CreateUserPopUp} setCreateUserPopUp={setCreateUserPopUp} />}
           {CreateStorePopUp && <StorePopUp CreateStorePopUp={CreateStorePopUp} setCreateStorePopUp={setCreateStorePopUp} />}
          <div>
          </div>
           <nav>
             <NavBar/>
           </nav>
            <div className='w-[85%] mx-auto pt-12'>
                <section>
                    <div className='text-2xl font-semibold text-center'>Admin Dashboard</div>
                </section>

                <section className='flex flex-col gap-3'>
                    <div className='text-lg font-semibold'>Statistics</div>
                    <div>
                        <div className='text-lg space-x-2 '>
                          <span>Total Users:</span>
                          <span>{totalUsers || 0}</span>
                          </div>
                        <div className='text-lg space-x-2 '>
                          <span>Total Stores:</span>
                          <span>{totalStores || 0}</span>
                        </div>
                        <div className='text-lg space-x-2 '>
                          <span>Total Users Submitted Rating:</span>
                          <span>{totalUsersSubmittedRating || 0}</span>
                        </div>
                    </div>
                </section>

                <section >
                    <div className='text-xl font-semibold text-center'>Add User/store</div>
                    <div className='flex justify-evenly'>

                        <button onClick={UserPopUpToggle} type="button" className="focus:outline-none cursor-pointer text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Create user/admin</button>

                        <button onClick={StorePopUpToggle} type="button" className="focus:outline-none cursor-pointer text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                            Create Store</button>
                    </div>
                </section>

                {/* userTable  */}
                <div className='space-y-16 py-8'>
                  <section>
                    <UserTable/>
                </section>

                {/* Stores Table  */}
                <section>
                    <StoreTable />
                </section>
                </div>
            </div>
        </div>
  )
}

export default Admin
