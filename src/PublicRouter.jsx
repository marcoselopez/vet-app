import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginComponent from './components/LoginComponent/LoginComponent'
import RegisterComponent from './components/RegisterComponent/RegisterComponent'

export const PublicRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace/>} />
        <Route exact path='/login' element={<LoginComponent />} />
        <Route exact path='/register' element={<RegisterComponent />} />
        
        <Route path="*" element={<Navigate to='/' replace/>} />
      </Routes>
    </BrowserRouter>
  )
};

export default PublicRouter;