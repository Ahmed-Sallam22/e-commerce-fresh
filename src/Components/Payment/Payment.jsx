import React, { useContext } from 'react'
import styles from './Payment.module.css'
import { cartContext } from '../../Context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Payment() {
    const {CartID }=useContext(cartContext)

    const navigate=useNavigate()

   async  function PayCash(){ 
        try{
          const {data}  = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${CartID}`,{
            "shippingAddress":{
                "details": document.querySelector('#details').value,
                "phone":  document.querySelector('#phone').value,
                "city": document.querySelector('#city').value,
                }
          },{
                headers:{'token':localStorage.getItem('userToken')}
            })
            console.log(data);
            if(data.status==='success'){
                navigate('/allorders')
            }
        }
        catch(err){

        }
        

    }

   async  function PayCredit(){ 
        try{
          const {data}  = await axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${CartID}`,{
            "shippingAddress":{
                "details": document.querySelector('#details').value,
                "phone":  document.querySelector('#phone').value,
                "city": document.querySelector('#city').value,
                }
          },{
                headers:{'token':localStorage.getItem('userToken')},
                params:{'url' : 'http://localhost:3000'}
            })
            console.log(data);
            if(data.status==='success'){
                window.location.href=data.session.url
            }
        }
        catch(err){
            console.log('error',err);

        }
    }

  

    return <>
 <Helmet>
            <title>Payment</title>
        </Helmet>
    <div className="w-50 py-3 mx-auto">
        <form >
            <label className='mb-2' htmlFor="details">Details :</label>
            <input type="text" className='form-control mb-3'  name='details' id='details'/>
            <label className='mb-2' htmlFor="phone">Phone :</label>
            <input type="tel" className='form-control mb-3'  name='phone' id='phone'/>
            <label className='mb-2' htmlFor="city">City :</label>
            <input type="text" className='form-control mb-3'  name='city' id='city'/>
            <button className="btn btn-primary w-100 mx-auto mb-2" type='button' onClick={PayCash} >Pay Cash</button>


<button className="btn btn-primary w-100 mx-auto" type='button' onClick={PayCredit} >Pay <i className="fa-brands fa-cc-visa fa-lg"></i></button>
        </form>
    </div>
    </>
}
