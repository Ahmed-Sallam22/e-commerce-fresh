import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Slider from "react-slick";
import Loading from '../Loading/Loading';
import { cartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';


export default function ProductDetails() {
  let { addToCart ,getcartCount } = useContext(cartContext)
  const [isloading, setisloading] = useState(false)
  const notify = (mess,type) =>{ 
    toast[type](mess);
};


  async function addProduct(productId){
    setisloading(true);

    let token =localStorage.getItem('userToken')
    if(token){
        let response = await addToCart(token,productId);
        setisloading(false);
        getcartCount()
        notify(response.data.message ,'success')

        console.log(response);
    }
    else{
        notify("No product Add" ,'success')
    }

}



        
        let {id} =useParams();
        async function getProductDetails(){
        let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
        setProductDetails(data.data);  
    }
    useEffect(()=>{
        getProductDetails()
    }, [] )



   
const [product, setProductDetails] = useState([])

var settings = {
    dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return <>
     <Helmet>
            <title>Product Details</title>
        </Helmet>


  {product.length !==0?  <div key={product._id} className="row align-items-center py-3">
        <div className="col-md-4"> 

      <div>
        <h2>{product?.title}</h2>
        <Slider {...settings}>

            {product.images?.map((img ,product_id)=><img key={product_id} src={img} alt="" />)}
        </Slider> 
      </div>


        
        </div>
        <div className="col-md-8">
            <h3 className='text-main'>{product?.title}</h3>
            <p className='p-2'>{product?.description}</p>
        <div className="d-flex justify-content-between py-3">
            <span className='text-muted'>{product?.price} EGP</span>
            <span className='text-muted'><i className='fas fa-star rating-color'></i>
                            {product?.ratingsAverage}Rating</span>
                            
        </div>
        {isloading ? <button className='btn bg-main text-white w-100'><i className='fa fa-spinner fa-spin'></i></button>:
        <button onClick={()=>addProduct(product._id)} className='btn bg-main text-white w-100 '>Add to Cart</button>}

        </div>
    </div>
    
    :<Loading/>}
    </>
}
