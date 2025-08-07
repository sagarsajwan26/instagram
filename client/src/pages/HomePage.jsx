import React, { useEffect } from 'react'
import MenuSidebar from '../components/Homepage/MenuSidebar'
import { Outlet } from 'react-router'
import { useDispatch } from 'react-redux'
import { getAllPosts } from '../store/post/post.thunk'

function HomePage() {
const dispatch= useDispatch()
useEffect(()=>{
  dispatch(getAllPosts())
},[])

  return (
    <div className="flex min-h-screen w-full bg-base-100 gap-4">
      <div className="hidden md:block w-0 md:w-56">
        <MenuSidebar />
      </div>
    
      <main className="flex-1  bg-base-100">
        <Outlet />
      </main>
    </div>
  )
}

export default HomePage
