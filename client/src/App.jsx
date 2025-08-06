import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import LoginSignupPage from './pages/LoginSignupPage'
import { ToastContainer } from 'react-toastify'
import Reels from './components/Homepage/Reels'
import UploadReel from './components/Homepage/UploadReel'
import Chats from './components/Homepage/Chats'
import Notifications from './components/Homepage/Notifications'
import Profile from './components/Homepage/Profile'
import Search from './components/Homepage/Search'
import Saved from './components/Homepage/Saved'
import Setting from './components/Homepage/Setting'


const App = () => {
  const {isAuthenticated,userData} = useSelector(state=> state.user)
  
  
   
  return (
    <div data-theme='night' >
      <Routes>
        <Route path="/" element={isAuthenticated? <HomePage />: <Navigate to='/login'/> } > 
        <Route index element={<Reels/>} />
        <Route path='/upload' element={<UploadReel/>} />
        <Route path='/chats' element={<Chats/>}/>
        <Route path='/notification' element={<Notifications/>}/>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/search' element={<Search />} />
        <Route path='/setting' element={<Setting/>}/>
        <Route path='/saved' element={<Saved/>} />
        </Route>
        <Route path='/login' element={<LoginSignupPage/>} />
      </Routes>
<ToastContainer/>
    </div>
  )
}

export default App