import React, { useContext, useEffect, useState } from "react";
import styles from "./Brands.module.css";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { cartContext } from "../../Context/CartContext";
export default function Brands() {
  const [Brands, setBrands] = useState([]);
  let { getcartCount } = useContext(cartContext);

  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    setBrands(data.data);
    console.log(data.data);
  }
  useEffect(() => {
    getBrands();
    getcartCount();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {Brands.length !== 0 ? (
        <div className="container">
          <div className="row">
            {Brands?.map((Brand) => (
              <div key={Brand._id} className="col-md-3 col-6 col-lg-2">
                <Link
                  className="text-decoration-none"
                  to={`/BrandsDetails/${Brand._id}`}
                >
                  <div className="product cursor-pointer px-2 py-4">
                    <img
                      className="w-100"
                      height={200}
                      src={Brand.image}
                      alt=""
                    />
                    <h6>{Brand.name}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
