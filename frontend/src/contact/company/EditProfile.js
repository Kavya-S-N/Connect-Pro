import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import company from '../assets/company.jpg'
import CompanyNav from './CompanyNav'
import RightFixed from './RightFixed'


class EditProfile extends Component {
    render() {
        return (
        
         <div>
             <CompanyNav/>
              <form method="post">
                 <div className="container">
                    <div className="row"> 
                        <div className="col-md-8">
                           
                         <div className="card card-header"> 
                             <h4 className="mx-auto text-blue mt-2">Edit Your Profile</h4><hr/>
                               <input type="text" className="col-md-12" placeholder="Company Name" required></input>
                               <textarea placeholder="Discription"></textarea>
                      
                              <div className="row">
                                <input type="text" className="col-md-7 ml-3" placeholder="website" required ></input>
                                <input type="password" className="col-md-4 ml-4" placeholder="Add slug" required></input>
                              </div>

                              <div className="row">
                                <input type="text" className="col-md-6 ml-3" placeholder="Email Address" required></input>
                                <input type="text" className="col-md-5 ml-4" placeholder="contact number" required></input>
                              </div>
                                         
                              <textarea placeholder="Address"></textarea>

                             <div className="row" style={{marginLeft:'22%'}}>
                               <Link to="/company/profile" className="mr-5 "><input type="reset" className="btn btn-blue" value="Update"></input></Link>
                               <input type="reset" className="btn btn-dark col-md-3 ml-5" value="Reset"></input>
                             </div>
                           {/* <p className="mx-auto"> Already have an account?<Link to="/login"> Sign In</Link></p> */}
					     </div>
                       </div>

                        <div className="col-md-4">
                           <RightFixed/>                      
                         </div>                           
                    </div>
                
                        
                </div>
           </form>
         </div>
        )
    }

}
export default EditProfile
