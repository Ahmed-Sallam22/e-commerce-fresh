import React from 'react'
import styles from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'


export default function   Layout({userData ,setuserData}) {
  let navigate=useNavigate()

  function logout(){
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/login')
  }
  
    return <>
      <Navbar  userData={userData} logout={logout}/>
      <div className="container pt-5 mt-5">
      <Outlet/>

      </div>
      <Footer/>
    </>
}
