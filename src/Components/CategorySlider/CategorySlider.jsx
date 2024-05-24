import React from 'react'
import styles from './CategorySlider.module.css'
import slide1 from "../../assets/images/Slider/slider-image-1.jpeg"
import slide2 from "../../assets/images/Slider/slider-image-2.jpeg"
import slide3 from "../../assets/images/Slider/slider-image-3.jpeg"
import slide4 from "../../assets/images/Slider/slider-2.jpeg"
import slide5 from "../../assets/images/Slider/grocery-banner-2.jpeg"
import slide6 from "../../assets/images/Slider/grocery-banner.png"
import Slider from "react-slick";
export default function CategorySlider() {

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
      };
      
    return <>
    <Slider {...settings}>
        <div>
    <div className="container-lg container-fluid">
    <div className="row g-0">
       <div className="col-md-9">
            <img src={slide1} height={350} className='w-100' alt="" />
        </div>
        <div className="col-md-3">
            <img src={slide6}height={175} className='w-100' alt="" />
            <img src={slide5}height={175} className='w-100' alt="" />
        </div>
       </div>
    </div>
    </div>
    <div>
    <div className="container-lg container-fluid">
    <div className="row g-0">
       <div className="col-md-9">
            <img src={slide2} height={350} className='w-100' alt="" />
        </div>
        <div className="col-md-3">
            <img src={slide4}height={175} className='w-100' alt="" />
            <img src={slide6}height={175} className='w-100' alt="" />
        </div>
       </div>
    </div>
    </div>
    <div>
    <div className="container-lg container-fluid">
    <div className="row g-0">
       <div className="col-md-9">
            <img src={slide3} height={350} className='w-100' alt="" />
        </div>
        <div className="col-md-3">
            <img src={slide1}height={175} className='w-100' alt="" />
            <img src={slide2}height={175} className='w-100' alt="" />
        </div>
       </div>
    </div>
    </div>
    </Slider>



    </>
}
