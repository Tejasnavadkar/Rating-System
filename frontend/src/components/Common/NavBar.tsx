import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

      const navigate = useNavigate()

    const logOutHandler = () => {
    localStorage.clear()
    navigate('/')

  }

  return (
    <nav className='flex justify-between px-4 py-2 border '>
          <div className='font-bold text-xl'>Store Rating</div>
          <div>
            <button onClick={logOutHandler} className='bg-red-800 text-white px-2 py-1 rounded-md cursor-pointer'>LogOut</button>
          </div>
        </nav>
  )
}

export default NavBar
