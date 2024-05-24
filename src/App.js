import React, {  useEffect, useState } from 'react'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories' 
import NotFound from './Components/NotFound/NotFound' 
import { RouterProvider, createHashRouter } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode'
import { Offline } from "react-detect-offline";
import ProtectRoute from './Components/ProtectRoute/ProtectRoute'
import {CartContextProvider } from './Context/CartContext'
import Cart from './Components/Cart/Cart'
import CategoryDetails from './Components/CategoryDetails/CategoryDetails'
import Brands from './Components/Brands/Brands'
import BrandsDetails from './Components/BrandsDetails/BrandsDetails'
import About from './Components/About/About'
import AllOrders from './Components/AllOrders/AllOrders'
import FeaturedProducts from './Components/FeaturedProducts/FeaturedProducts'
import Payment from './Components/Payment/Payment'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword' 
import ResetPassword from './Components/ResetPassword/ResetPassword' 


export default function App() {


  useEffect(()=>{
    if(localStorage.getItem('userToken')!==null){
      saveUserData()

    }
  },[])

  const [userData, setuserData] = useState(null)

  function saveUserData(){
    let encodedToken=localStorage.getItem('userToken');
    let decodedToken=jwtDecode(encodedToken);
    setuserData(decodedToken)
  }



  let routers=createHashRouter([
    {path:'',element:<Layout userData={userData} setuserData={setuserData}/>,children:[
      {index:true , element:<ProtectRoute>  <Home/> </ProtectRoute>},
      {path:'Products' , element:<ProtectRoute> <Products/> </ProtectRoute>},
      {path:'cart' , element:<ProtectRoute> <Cart/> </ProtectRoute>},
      {path:'Payment' , element:<ProtectRoute> <Payment/> </ProtectRoute>},
      {path:'about',element: <ProtectRoute> <About/></ProtectRoute>},
      {path:'brands' , element:<ProtectRoute> <Brands/> </ProtectRoute>},
      {path:'FeaturedProducts' , element:<ProtectRoute> <FeaturedProducts/> </ProtectRoute>},
      {path:'allorders' , element:<ProtectRoute> <AllOrders userData={userData}/> </ProtectRoute>},
      {path:'Categories' , element:<ProtectRoute> <Categories/></ProtectRoute>},
      {path:'ProductDetails/:id', element:<ProtectRoute><ProductDetails/></ProtectRoute>},
      {path:'CategoryDetails/:id', element:<ProtectRoute><CategoryDetails/></ProtectRoute>}, 
      {path:'BrandsDetails/:id', element:<ProtectRoute><BrandsDetails/></ProtectRoute>}, 
      {path:'Login' , element:<Login saveUserData={saveUserData}/>},
      {path:'Register' , element:<Register/>},
      {path:'ForgetPassword' , element:<ForgetPassword/>},
      {path:'ResetPassword' , element:<ResetPassword />},
      {path:'*' , element:<NotFound/>},
    ]}
  ])


  return<>
    <ToastContainer  theme='colored'position="top-center"
autoClose={1000}/>
   <CartContextProvider>
    <Offline> <div className='network'>
    You are offline Now (Check our Network!)
      </div> </Offline>

  <RouterProvider router={routers}/>
  </CartContextProvider>

  </> 
}
