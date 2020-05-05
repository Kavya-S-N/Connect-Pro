import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import logo from '../assets/logo.png'

class CompanyNav extends Component {
    render() {
      return (
           <div>
                <div>
                <nav className='navbar bg-blue' >
                     <img  className='justify-left' src={logo} style={{width:'180px'}}></img> 
                        <ul className="justify-right">
           
                             <li><Link to="/company/c_dash"><i className='fa fa-home'></i> Home</Link></li>
                             <li><Link to="/company/department"><i className='fa fa-file-code-o'></i> Projects</Link></li>
                             <li><Link to="/company/jobs"><i className='fa fa-briefcase'></i> MyJobs</Link></li>
                             <Link to="/"><i className='fa fa-sign-out'></i> Logout</Link>
                             {/* <li><Link to="/company/companies"><i className='fa fa-university'></i> Companies</Link></li> */}
                       
                             {/* <a class="dropdown" >
                                 <img src={avatar} alt="Avatar" class="avatar dropbtn "></img>
                                 <div class="dropdown-content">
                                      <Link to="/company/profile"><img src={avatar} alt="avatar" class="profile_avatar"></img> Name</Link><hr/>
                                      <Link to="/company/c_dash"><i className='fa fa-cog'></i> Settings</Link>
                                      <Link to="/company/c_dash"><i className='fa fa-info'></i> ..Help</Link><hr/>
                                      <Link to="/"><i className='fa fa-sign-out'></i> Logout</Link>
                                  </div>
                             </a> */}
                        </ul>
                </nav>


            </div>
            {/* <div className="row mt-5 mb-5"></div> */}
            </div>
       )
    }

}
export default CompanyNav
