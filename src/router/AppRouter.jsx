import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import MainLayout from '../layouts/MainLayout'
import RegisterPage from '../pages/RegisterPage'
import TodoPage from '../pages/TodoPage'
import LoginPage from '../pages/LoginPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<LoginPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
          <Route path='todo' element={<TodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter