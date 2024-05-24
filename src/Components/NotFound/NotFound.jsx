import React, { useContext, useEffect } from 'react'
import styles from './NotFound.module.css'
import Photo404 from "../../assets/images/error.svg"
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/CartContext'
export default function NotFound() {
    let { getcartCount } = useContext(cartContext)
    useEffect(()=>{
        getcartCount()
    },[])


    return <>
     <Helmet>
            <title>Not Found</title>
        </Helmet>

        <img src={Photo404} alt=""  className='w-50'/>
    </>
}
