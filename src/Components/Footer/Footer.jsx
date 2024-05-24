import React from 'react'
import styles from './Footer.module.css'
import Amazon from '../../assets/images/New folder/5968269.png'
import American from '../../assets/images/New folder/free-americanexpress-credit-debit-card-bank-transaction-32287.png'
import Master from '../../assets/images/New folder/mastercard-icon-512x329-xpgofnyv.png'
import Pay from '../../assets/images/New folder/196566.png'
import store from '../../assets/images/New folder/jgf7stYVi.png'
import store2 from '../../assets/images/New folder/360_F_376662920_zqGXBodBGhHkUQEFbnHt1FuQSV7stYVi.png'
import { Link } from 'react-router-dom'
export default function Footer() {
    return <>
    <footer className='mt-5 py-5'>
        <div className="container ">
        <h2 className='h4'>Get The freshCart App</h2>
        <p className='text-muted'>We will send you a link, open it on your Phone To download the app</p>
        <div className="row ps-md-4">
            <div className="col-lg-10 pb-2">
                <input type="email" placeholder='Email...'  className='form-control' />
            </div>
            <div className="col-lg-2">
                <button className='btn bg-main text-white'>Share App Link</button>
            </div>
            <div className="pt-4 brd">
            </div>

        </div>
        <div className="row d-flex ps-4">
           <div className="col-lg-6 py-3">
            <div className="row d-flex g-0 pt-lg-3 pt-1 ">
                <div className="col-lg-3">
                <p className='fw-bold pt-lg-1 pt-0'>Payment Partners</p>
                </div>
                <div className="col-lg-9">
                    <ul className='list-unstyled d-flex'>
                        <li>
                            <img src={Amazon} width={40} alt="" />
                        </li>
                        <li className='pt-1'>
                            <img src={American} width={30} alt="" />
                        </li>
                        <li className='pt-1'>
                            <img src={Master} width={20} alt="" />
                        </li>
                        <li className='p-1'>
                            <img src={Pay} width={30} alt="" />
                        </li>
                    </ul>
                </div>
            </div>
           </div>
            <div className="col-lg-6 ps-lg-5">
                <div className="row g-0 ps-lg-5">
                <div className="col-6 ps-lg-5 pt-lg-4 pt-0">
                <p className='fw-bold pt-2 '>Get delivires with freshCart</p>
                </div>
                
                <div className="col-lg-6">
                    <ul className='list-unstyled d-flex'>
                        <li className='pt-2 '>
                        <img className='pt-4' src={store} width={90}  alt="" />
                        </li>
                        <li className='ps-2'>
                            <img src={store2} width={95} alt="" />
                        </li>
                    </ul>
                </div>
            </div>
                
            </div>
                
            <div className="brd"></div>
            </div>
          
        </div>
    </footer>
    </>
}
