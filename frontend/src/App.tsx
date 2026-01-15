
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './Pages/AuthPages/LoginPage'
import SignUpPage from './Pages/AuthPages/SignUpPage'

function App() {

  return (
    <>
       <div>
          <BrowserRouter>
             <Routes>
               <Route path='/' element={<LoginPage/>}></Route>
               <Route path='/signup' element={<SignUpPage/>}></Route>
             </Routes>
          </BrowserRouter>
       </div>
    </>
  )
}

export default App
