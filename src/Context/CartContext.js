import React from "react";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
export let cartContext = createContext();

export function CartContextProvider({ children }) {
  const [Count, setCount] = useState(0);
  const [CartID, setCartID] = useState(null);

  async function addToCart(token, productId) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: { token },
        }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  async function getLoggedusercart(token) {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  async function removeItem(token, productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token },
      })
      .then((data) => data)
      .catch((error) => error);
  }
  async function clear(token) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then((data) => data)
      .catch((error) => error);
  }
  async function UpdateCount(token, productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        {
          headers: { token },
        }
      )
      .then((data) => data)
      .catch((error) => error);
  }
  async function getcartCount() {
    let token = localStorage.getItem("userToken");
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then((data) => {
        setCount(data.data.numOfCartItems);
        setCartID(data.data.data._id);
      })
      .catch((error) => error);
  }
  async function getcartCountERROR() {
    let token = localStorage.getItem("userToken");
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token },
      })
      .then((data) => {
        setCount(data.data.numOfCartItems);
        setCartID(data.data.data._id);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("No Cart Exist");
        }
      });
  }

  async function OnlinePayment(shippingAddress, CartID) {
    return await axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${CartID}?url=http://localhost:3000`,
        {
          shippingAddress: shippingAddress,
        }
      )
      .then((data) => data)
      .catch((error) => error);
  }

  // async function addTowishlist(token,productId){
  //     return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
  //         headers:{token}
  //     }).then(data=>data)
  //     .catch(error=>error);
  // }

  // async function getLoggeduserwishlist(token){
  //     return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
  //         headers:{token}
  //     }).then(data=>data)
  //     .catch(error=>error);
  // }

  // async function removeItemWhis(token,productId){
  //     return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
  //         headers:{token}
  //     }).then(data=>data)
  //     .catch(error=>error);
  // }

  return (
    <>
      <cartContext.Provider
        value={{
          CartID,
          getcartCountERROR,
          addToCart,
          getcartCount,
          getLoggedusercart,
          removeItem,
          UpdateCount,
          OnlinePayment,
          Count,
          setCount,
          clear,
        }}
      >
        {children}
      </cartContext.Provider>
    </>
  );
}
