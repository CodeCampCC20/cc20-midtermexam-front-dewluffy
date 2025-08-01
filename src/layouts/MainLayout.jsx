import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'


function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout