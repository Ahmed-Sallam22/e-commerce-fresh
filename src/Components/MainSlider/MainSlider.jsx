import React, { useState } from "react";
import styles from "./MainSlider.module.css";
import Slider from "react-slick";
import axios from "axios";
import { useEffect } from "react";

export default function MainSlider() {
  const [SlideCategory, setSlideCategory] = useState([]);
  async function getSlider() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setSlideCategory(data.data);
  }
  useEffect(() => {
    getSlider();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5,
    arrows: false,
  };
  return (
    <>
      <div className="container-lg container-fluid py-5">
        <h4>Shop Popular Categories</h4>
        <Slider {...settings}>
          {SlideCategory.map((category) => (
            <div key={category._id}>
              <div className="row">
                <img
                  className="w-100"
                  height={200}
                  src={category.image}
                  alt=""
                />
              </div>
              <h2 className="h6">{category.name}</h2>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
