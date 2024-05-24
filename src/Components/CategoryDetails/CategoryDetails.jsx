import React, { useEffect, useState } from 'react'
import styles from './CategoryDetails.module.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
export default function CategoryDetails() {

            
    let {id} =useParams();
    async function getProductDetails(){
    let {data} =await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories/${id}`)
    setProductDetails(data.data);  
}
useEffect(()=>{
    getProductDetails()
}, [] )




const [category, setProductDetails] = useState([])
    return <>
     <Helmet>
            <title>Category Details</title>
        </Helmet>
    {category.length!==0?<div className="container"> 
<div className="row justify-content-center text-center">
    <div className="col-md-4 col-3">
<img src={category.image} alt="" height={500}  className='w-100'/>
<h2 className='text-main'>{category.name}</h2>
    </div>
</div>
</div>
:<Loading/>}

    </>
}
