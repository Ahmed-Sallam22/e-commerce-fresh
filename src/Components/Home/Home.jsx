import React from 'react'
import styles from './Home.module.css'
import {Helmet} from "react-helmet";
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
export default function Home() {
  
    return <>
    <Helmet>
            <title>Home</title>
        </Helmet>
    <div className="container-xl container-fluid">
        <FeaturedProducts/>
       </div>
    </>
}
