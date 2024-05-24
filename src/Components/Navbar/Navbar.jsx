import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'



export default function Navbar({userData ,logout}) {
  let { Count  }= useContext(cartContext) 


    return (
        <nav className="navbar  navbar-expand-md navbar-light bg-light fixed-top">
              <div className="container-lg container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="" />
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                  {userData?<ul className="navbar-nav me-auto mt-2 mt-lg-0">
                      
                      <li className="nav-item">
                          <Link className="nav-link" to="/">Home</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="Products">Products</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="Categories">Categories</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="Brands">Brands</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="allorders">AllOrders</Link>
                      </li>
                     
                  </ul>:null}
                    

                   
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                      
{userData?<>
  <li className="nav-item">
                          <Link className="nav-link position-relative pe-4" to="Cart">
                            <i className='fas  fa-shopping-cart fa-xl'></i> 
                          <span className='badge position-absolute top-0 end-1 bg-main text-white'>{Count}</span>
                          </Link>
                      </li>
 
<li className="nav-item">
                <span  className="nav-link cursor-pointer" onClick={logout} >Logout</span>
              </li> 
</>
:

<>
            
<li className="nav-item">
                <Link className="nav-link" to='login'>Login</Link>
              </li>

              
<li className="nav-item">
                <Link className="nav-link" to='register'>Register</Link>
              </li>

             
              
              </>}
                  </ul>

               
        
          
                  
                </div>
          </div>
        </nav>
        
    )
}
