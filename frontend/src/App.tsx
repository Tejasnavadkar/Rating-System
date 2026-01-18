
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/AuthPages/LoginPage'
import SignUpPage from './Pages/AuthPages/SignUpPage'
import UserDashboard from './Pages/DashBoardPages/UserDashboard'
import OwnerDashboard from './Pages/DashBoardPages/OwnerDashboard'
import AdminDashboard from './Pages/DashBoardPages/AdminDashboard'
import { ContextProvider } from './context/Context'
import Protected from './components/Auth/Protected'
import VerifyEmail from './components/Auth/VerifyEmail'
import ResetPassword from './components/Auth/ResetPassword'


function App() {

 

  return (
    <>
       <div className=''>
         <ContextProvider>
          <BrowserRouter>
             <Routes>
               <Route path='/' element={<LoginPage/>}></Route>
               <Route path='/signup' element={<SignUpPage/>}></Route>
               <Route path='/verifyEmail' element={<VerifyEmail/>}></Route>
               <Route path='/resetPassword/:email' element={<ResetPassword/>} ></Route>
               <Route path='/userDashboard' element={
                <Protected>
                  <UserDashboard/>
                </Protected>
                }></Route>
                <Route path='/ownerDashboard' element={ 
                  <Protected>
                    <OwnerDashboard/>
                  </Protected>}>
                </Route>
                 <Route path='/adminDashboard' element={
                  <Protected>
                    <AdminDashboard/>
                  </Protected>
                  }>
                </Route>
             </Routes>
          </BrowserRouter>
         </ContextProvider>
       </div>
    </>
  )
}

export default App
