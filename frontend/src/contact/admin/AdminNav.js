import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import logo from '../assets/logo.png'

class CompanyNav extends Component {
    render() {
      return (
              <div class="sidenav">
                 <img  className='ml-4' src={logo} style={{width:'180px'}}></img>
                 <a href="/admin/admin_dash" className="mt-4"><i className='fa fa-home'></i> Home</a>
                 <a href="/admin/categorylist"><i className='fa fa-list-ul'></i> Categories</a>
                 <a href="/admin/studentlist"><i className='fa fa-group'></i> Students</a>
                 <a href="/admin/companylist"><i className='fa fa-university'></i> Companies</a>
                 <a href="/admin/projectlist"><i className='fa fa-file-code-o'></i> Projects</a>
                 <a href="/admin/joblist"><i className='fa fa-briefcase'></i> Jobs</a>
                 {/* <a href="/admin/profile"><i className='fa fa-user'></i> Profile</a> */}
                 <a href="/"><i className='fa fa-sign-out'></i> Logout</a>
               </div>

       )
    }

}
export default CompanyNav
