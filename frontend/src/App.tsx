
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/AuthPages/LoginPage'
import SignUpPage from './Pages/AuthPages/SignUpPage'
import UserDashboard from './Pages/DashBoardPages/UserDashboard'
import OwnerDashboard from './Pages/DashBoardPages/OwnerDashboard'
import AdminDashboard from './Pages/DashBoardPages/AdminDashboard'

function App() {

  return (
    <>
       <div>
          <BrowserRouter>
             <Routes>
               <Route path='/' element={<LoginPage/>}></Route>
               <Route path='/signup' element={<SignUpPage/>}></Route>
               <Route path='/userDashboard' element={<UserDashboard/>}></Route>
                <Route path='/ownerDashboard' element={<OwnerDashboard/>}></Route>
                 <Route path='/adminDashboard' element={<AdminDashboard/>}></Route>
             </Routes>
          </BrowserRouter>
       </div>
    </>
  )
}

export default App
