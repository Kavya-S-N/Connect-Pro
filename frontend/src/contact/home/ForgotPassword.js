import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Link} from 'react-router-dom'
import HomeNav from './HomeNav'
class ForgotPassword extends Component {
    render() {
        return (
           <div>
               <HomeNav/>
               <form method="post">
                  <div className="container "><br/><br/>
                      <div className="card card-header mx-auto col-md-5"> 
                          {/* <img  className='justify-left' src={logo} style={{width:'180px'}}></img> <hr/> */}
                          <h4 className="text-center text-blue mt-3">Reset Password</h4><hr/>
                                              
                          <div className="row">
                             <h4><i className=' col-md-2 ml-5 mt-4 fa fa-envelope'></i></h4>
                             <input type="text" className="col-md-7" placeholder="Email Address" required></input>
                          </div>
                         
                          <Link to="/" className="btn col-md-8 mx-auto btn-blue">Send OTP</Link><br/>
                 
                          {/* <p className="mx-auto"> Don't have an account?<Link to="/signup">Sign Up</Link></p> */}
                 
                        </div>
                   </div>
              </form>
           </div>
        )
    }
}
export default ForgotPassword
