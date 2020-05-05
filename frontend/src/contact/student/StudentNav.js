import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import logo from '../assets/logo.png'

class StudentNav extends Component {
   render() {
      return (
       <div>
            <nav className='navbar bg-blue'>
                <img  className='justify-left' src={logo} style={{width:'180px'}}></img> 
                <ul className="justify-right">
                  <li>
                      <Link to="/student/s_dash"><i className='fa fa-home'></i> Home</Link>
                   </li>
                   <li>
                      <Link to="/student/projects"><i className='fa fa-file-code-o'></i>  MyProjects</Link>
                   </li>
                   <li>
                      <Link to="/student/companylist"><i className='fa fa-university'></i> Companies</Link>
                   </li>
                   {/* <li>
                      <Link to="/student/jobs_category"><i className='fa fa-briefcase'></i> Jobs</Link>
                   </li> */}
                   <li>
                      <Link to="/student/s_dash"><i className='fa fa-bell'></i> Notifications</Link>
                   </li>
                   <li>
                   <Link to="/"><i className='fa fa-sign-out'></i> Logout</Link>
                   </li>
                   {/* <a class="dropdown" >
                     <img src={avatar} alt="Avatar" class="avatar dropbtn "></img>
                       <div class="dropdown-content">
                          <Link to="/student/profile"><img src={avatar} alt="avatar" class="profile_avatar"></img> Name</Link><hr/>
                          <Link to="/student/s_dash"><i className='fa fa-cog'></i> Settings</Link>
                          <Link to="/student/s_dash"><i className='fa fa-info'></i> ..Help</Link><hr/>
                          <Link to="/"><i className='fa fa-sign-out'></i> Logout</Link>
                        </div>
                   </a> */}
                </ul>
            </nav>
        </div>
      )
    }

}
export default StudentNav
