import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomeComponent from './components/Home/HomeComponent'
import ProductsComponent from './components/ProductsComponent/ProductsComponent'
import RegisterPetsComponent from './components/RegisterPetsComponent/RegisterPetsComponent'

const PrivateRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' replace/>} />
        <Route exact path='/home' element={<HomeComponent />} />
        <Route exact path='/products' element={<ProductsComponent />} />
        <Route exact path='/register-pets' element={<RegisterPetsComponent />} />

        <Route path="*" element={<Navigate to='/' replace/>} />
      </Routes>
    </BrowserRouter>
  )
};

export default PrivateRouter;