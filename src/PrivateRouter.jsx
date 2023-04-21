import { Navigate, Route, Routes } from 'react-router-dom'
import HomeComponent from './components/Home/HomeComponent'
import ProductsComponent from './components/ProductsComponent/ProductsComponent'
import RegisterPetsComponent from './components/RegisterPetsComponent/RegisterPetsComponent'
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import AdminDashboardComponent from './components/DashboardComponent/AdminDashboardComponent';
import Presentation from './components/ProductsComponent/Presentation';
import Ordering from './components/ProductsComponent/Ordering';
import ConfirmOrder from './components/ProductsComponent/ConfirmOrder';

const PrivateRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace/>} />
      <Route exact path='/home' element={<HomeComponent />} />
      <Route exact path='/products' element={<ProductsComponent />}>
        <Route exact path='presentation' element={<Presentation />} />
        <Route exact path='ordering' element={<Ordering />} />
        <Route exact path='confirm-order' element={<ConfirmOrder />} />
      </Route>
      <Route exact path='/register-pets' element={<RegisterPetsComponent />} />
      <Route exact path='/dashboard' element={sessionStorage.role === 'client' ? <DashboardComponent /> : <AdminDashboardComponent />} />

      <Route path="*" element={<Navigate to='/' replace/>} />
    </Routes>
  )
};

export default PrivateRouter;