import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomeComponent from './components/Home/HomeComponent'
import LoginComponent from './components/LoginComponent/LoginComponent'
import RegisterComponent from './components/RegisterComponent/RegisterComponent'

export const Router = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Navigate to='/home' replace/>} />
      <Route exact path='/home' element={<HomeComponent />} />
      <Route exact path="*" element={<Navigate to='/home' replace/>} />
    </Routes>
  )
}

export const PublicRouter = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Navigate to='/login' replace/>} />
      <Route exact path='/login' element={<LoginComponent />} />
      <Route exact path='/register' element={<RegisterComponent />} />
      <Route exact path="*" element={<Navigate to='/login' replace/>} />
    </Routes>
  )
};