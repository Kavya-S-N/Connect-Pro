import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomeRoutes from '../home/HomeRoutes'
import Admin_dash from './Admin_dash'
import CategoryList from './CategoryList'
import StudentList from './StudentList'
import ProjectList from './ProjectList'
import CompanyList from './CompanyList'
import JobList from './JobList'
import AddCategory from './AddCategory'
import AddCompany from './AddCompany'
import AddProject from './AddProject'
import AddJob from './AddJob'
import AddStudent from './AddStudent'
// import Profile from './Profile'

const AdminRoutes =()=>
{
    return(
        // <div>
           <Router>
                <Switch>
                    <Route path={'/admin/admin_dash'} component={Admin_dash}/>
                    <Route path={'/admin/studentlist'} component={StudentList}/>
                    <Route path={'/admin/projectlist'} component={ProjectList}/>
                    <Route path={'/admin/joblist'} component={JobList}/>
                    <Route path={'/admin/companylist'} component={CompanyList}/>
                    <Route path={'/admin/categorylist'} component={CategoryList}/>
                    <Route path={'/admin/add_category'} component={AddCategory}/>
                    <Route path={'/admin/add_company'} component={AddCompany}/>
                    <Route path={'/admin/add_project'} component={AddProject}/>
                    <Route path={'/admin/add_job'} component={AddJob} />
                    <Route path={'/admin/add_student'} component={AddStudent} />
                    {/* <Route path={'/admin/profile'} component={Profile}/> */}
                    <HomeRoutes/>
                </Switch>    
           </Router>
        // </div>
    )
}
     
export default AdminRoutes
