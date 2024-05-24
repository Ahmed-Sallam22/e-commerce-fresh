import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import axios from 'axios'
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
    let { getLoggedusercart ,removeItem  ,UpdateCount ,getcartCount,getcartCountERROR}= useContext(cartContext) 
    
    const [Cart, setCart] = useState([])
    const notify = (mess,type) =>{ 
        toast[type](mess);
        };
        const [isloading, setisloading] = useState(false)

    const [TotalPrice, setTotalPrice] = useState([])
    async function getCart(){
        let token=localStorage.getItem('userToken')
        if(token){     
        let response= await getLoggedusercart(token);
        setCart(response.data.data.products)
        setTotalPrice(response.data.data)
        }
    }
    async function deletItem(productId){
        let token=localStorage.getItem('userToken')
        if(token){     

        let response= await removeItem(token,productId);
        notify('Product Deleted ', 'success')
        getcartCount()
        setCart(response.data.data.products)
        setTotalPrice(response.data.data)
        }
    }

    async function updateProduct(productId ,count){
        let token=localStorage.getItem('userToken')
        if(token){     
        let response= await UpdateCount(token,productId ,count);
        notify('Product Updated', 'success')
        setCart(response.data.data.products)
        setTotalPrice(response.data.data)
        }
    }

    useEffect(   function(){
        getCart();
        let token=localStorage.getItem('userToken')
        getcartCountERROR(token)
    }, [])

    return <>
     <Helmet>
            <title>Cart</title>
        </Helmet>
       <div className="container">
    <div className="bg-main-light p-4 my-4">
        <h3>Shop Cart</h3>
        <h6 className='text-main'>Total Cart Price : {TotalPrice.totalCartPrice} EGP</h6>

        {Cart.length !==0? 
        <div className="container">
        {Cart?.map((item)=>{
            return <div key={item._id} className="row border-bottom my-2 ">
                <div className="col-md-1 gy-2 pb-3">
                    <img src={item.product.imageCover} className='w-100' alt="" />
                </div>
                <div className="col-md-11 d-flex justify-content-between">
            <div>
            <h6>{item.product.title}</h6>
                    <h6 className='text-main mx-2 fw-bolder'>{item.price} EGP</h6>
                                <button onClick={()=>deletItem(item.product._id)} className='btn text-danger'>Remove <i className="fa-solid fa-trash"></i></button>

            </div>
            <div className='col-md-2  ps-md-5'>
            <button onClick={()=>updateProduct(item.product._id,item.count+1)} className='btn btn-border'>+</button>

            <span className='mx-2'> {item.count} </span> 

            <button onClick={()=>updateProduct(item.product._id,item.count-1)} className='btn btn-border'>-</button>
                </div>
        
            </div>

            </div>
        })}
            <Link className='text-white' to={'/Payment'}>
        <button className='btn bg-main text-white'>
           CheckOut
        </button>
            </Link>
        </div>

:<Loading/>}
    </div>
    </div>
    </>
}
