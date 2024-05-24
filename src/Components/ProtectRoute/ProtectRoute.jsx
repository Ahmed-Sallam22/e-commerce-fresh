import React from 'react'
import styles from './ProtectRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute(props) {
    if(localStorage.getItem('userToken')==null){
      return <Navigate to={'/login'}/>
    }
    else{
        return props.children
    } 

}
