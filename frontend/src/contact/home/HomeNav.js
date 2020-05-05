import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import logo from '../assets/logo.png'

const HomeNav =()=>
{
    return(
      <div>
         <div className="bg-white">
            <nav className='navbar-light bg-white'>
                <img  className='justify-left' src={logo} style={{width:'180px'}}></img> 
                 <ul className="justify-right">
                      <li>
                         <Link className="btn btn-default" to="/">Home</Link>
                      </li>
                      <li>
                         <Link className="btn btn-default" to="/signup">Join now</Link>
                      </li>
                      
                      <li className="dropdown dropbtn mt-4">Signin
                         <div className="dropdown-content">
                         <a href="/slogin">student</a>
                         <a href="/clogin">Company</a>
                         <a href="/alogin">admin</a>
                            {/* <Link to="/slogin">As Student</Link>
                            <Link to="/clogin">As Company</Link>
                            <Link to="/alogin">As Admin</Link> */}
                         </div>
                      </li>
                </ul>
             </nav>
         </div>   
      </div>
        )
    }
export default HomeNav
