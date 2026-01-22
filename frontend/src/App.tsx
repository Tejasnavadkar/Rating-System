
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
import { ErrorBoundary, type FallbackProps} from 'react-error-boundary'
import FallBackUi from './shared/ErrorBoundary/FallBackUi'



function App() {

  const fallbackRenderHandler = ({ error }:FallbackProps) => {  // here we can catch the error and return fallback ui 
    console.log('error is:', error)
    return <FallBackUi error={error} />
  }

  return (
    <>
       <div className=''>
         <ContextProvider>
          <ErrorBoundary fallbackRender={fallbackRenderHandler} >
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
          </ErrorBoundary>
          
         </ContextProvider>
       </div>
    </>
  )
}

export default App
