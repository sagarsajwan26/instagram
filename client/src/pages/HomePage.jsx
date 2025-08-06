import React from 'react'
import MenuSidebar from '../components/Homepage/MenuSidebar'
import Reels from '../components/Homepage/Reels'
import { Outlet } from 'react-router'

function HomePage() {
  return (
    <div className='grid grid-cols-4' >
     <div className='col-span-1'>
       <MenuSidebar/>
     </div>
 <div className='col-span-3'>
      <Outlet/>
 </div>
    </div>
  )
}

export default HomePage