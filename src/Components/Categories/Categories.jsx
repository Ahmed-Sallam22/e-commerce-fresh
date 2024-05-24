import React, { useContext, useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/CartContext'
export default function Categories() {
    const [Categories, setCategories] = useState([])
    let {getcartCount} = useContext(cartContext)


    async function getCategories(){
        let {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
        setCategories(data.data);
    }
        useEffect(()=>{
            getCategories()
            getcartCount()

        },[])
    
    return <>
     <Helmet>
            <title>Categories</title>
        </Helmet>
    {Categories.length!==0?
    
    <div className="container">
    <div className="row">
        {Categories?.map((category)=>
            <div key={category._id} className="col-md-4 col-6 col-lg-3">
                <Link className='text-decoration-none' to={`/categoryDetails/${category._id}`}>
                <div className="product cursor-pointer px-2 py-4"> 
                <img className='w-100'height={200} src={category.image} alt="" />
                <h6>{category.name}</h6>

                
                </div>
                </Link>
            </div> 
            )}
        
    </div>
    </div>
    
    
    :<Loading/>}

    </>
}
