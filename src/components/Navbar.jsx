import React from 'react'
import { NavLink } from 'react-router'

function Navbar() {
  return (
    <nav className='h-13 bg-blue-500 flex justify-end items-center gap-6 pr-6'>
      <NavLink className={'cursor-pointer hover:underline'} to={'/login'}>Login</NavLink>
      <NavLink className={'cursor-pointer hover:underline'} to={'/todo'}>Todo</NavLink>
      <NavLink className={'cursor-pointer hover:underline'} to={'/register'}>Register</NavLink>
    </nav>
  )
}

export default Navbar