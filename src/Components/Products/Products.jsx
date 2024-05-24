import React, { useContext, useEffect, useState } from "react";
import styles from "./Products.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
export default function Products() {
  const [isloading, setisloading] = useState(false);
  let { addToCart, getcartCount } = useContext(cartContext);
  const notify = (mess, type) => {
    toast[type](mess);
  };

  const [Products, setProduct] = useState([]);
  async function addProduct(productId) {
    setisloading(true);
    let token = localStorage.getItem("userToken");
    if (token) {
      let response = await addToCart(token, productId);
      getcartCount();
      setisloading(false);

      notify(response.data.message, "success");
    } else {
      notify("No product Add", "success");
    }
  }
  async function getProduct() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    setProduct(data.data);
  }
  useEffect(() => {
    getProduct();
    getcartCount();
  }, []);
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {Products.length !== 0 ? (
        <div className="row">
          {Products.map((product) => (
            <div key={product._id} className="col-md-4 col-6 col-lg-2">
              <div className="product cursor-pointer px-2 py-4">
                <Link
                  className="text-decoration-none"
                  to={`/ProductDetails/${product._id}`}
                >
                  <img className="w-100" src={product.imageCover} alt="" />
                  <h3 className="h6 fw-bolder py-2">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <span className="text-main fw-bold font-sm">
                    {product.quantity}
                  </span>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">{product.price}EGP</span>
                    <span className="text-muted">
                      <i className="fas fa-star rating-color"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                {isloading ? (
                  <button className="btn bg-main text-white w-100">
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => addProduct(product._id)}
                    className="btn bg-main text-white w-100"
                  >
                    +Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
