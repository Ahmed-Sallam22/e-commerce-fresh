import React, {  useContext, useEffect } from 'react'
import styles from './AllOrders.module.css'
import axios from 'axios'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import Loading from '../Loading/Loading'
import { cartContext } from '../../Context/CartContext'
export default function AllOrders({userData}) {

    const [allOrder, setallOrder] = useState([])
    let { getcartCount } = useContext(cartContext)


    async function getAllOrders(){
        const {data}=await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${userData.id}`)
        setallOrder(data);
    }
    useEffect(()=>{
        getAllOrders();
        getcartCount()
    },[])

    return <>
     <Helmet>
            <title>All Orders</title>
        </Helmet>
        <div className="container">
                {allOrder.length !==0?  <div className="row g-3">
                {allOrder?.map((order ,id)=>{
                    return<div className="col-md-4" key={id}>  
                   <div className="order bg-main-light ">

                   <div className="container">
<div className="row">
    {order?.cartItems?.map((item ,index)=>{
        return  <div className="col-md-4" key={index}>
        <div className="item  py-2">
            <h6 className='py-3 text-main'>{item.product.title.slice( 0 ,10)}</h6>
            <img src={item.product.imageCover} className='w-100' alt="" />
            <h6 className='text-secondary'>Count : {item.count}</h6>
            <h6 className='text-success'>Price : {item.price}</h6>

        </div>
    </div>
    })}
          </div>
      </div> 
                    <h6 className='ps-2 text-danger'>Total Price: {order?.totalOrderPrice}</h6>
                    <h6 className='ps-2 pb-4 text-info'>Order type: {order?.paymentMethodType}</h6>
                   </div>
                </div>
                })}

            </div>:<Loading/>}
          
        </div>
    </>
}
