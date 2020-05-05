import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import S_dash from './S_dash'
import Projects from './ProjectList'
import Profile from './Profile'
import EditProfile from './EditProfile'
import ViewCompany from './ViewCompany'
import AddProject from './AddProject'
import ViewProject from './ViewProject'
import EditProject from './EditProject'
import HomeRoutes from '../home/HomeRoutes'
import JobsCaregory from './JobsCategory'
import CategoryJobList from './CategoryJobList'
import ViewJob from './ViewJobs';
import JobofCompany from './JobofCompany'
import CompanyList from './CompanyList'

const StudentRoutes =()=>
{
    return(
        // <div>
           <Router>
                <Switch>
                    <Route path={'/student/s_dash'} component={S_dash}/>
                    <Route path={'/student/add_project'} component={AddProject}/>
                    <Route path={'/student/projects'} component={Projects}/>
                    <Route path={'/student/profile/edit'} component={EditProfile}/>
                    <Route path={'/student/ViewProject'} component={ViewProject}/>
                    <Route path={'/student/EditProject'} component={EditProject}/>
                    <Route path={'/student/jobs'} component={ViewJob}/>
                    <Route path={'/student/company/job'} component={JobofCompany}/>
                    <Route path={'/student/jobs_category'} component={JobsCaregory}/>
                    <Route path={"/student/category/jobs"} component={CategoryJobList}/>
                    <Route path={'/student/profile'} component={Profile}/>
                    <Route path={'/student/company'} component={ViewCompany}/>
                    <Route path={'/student/companylist'} component={CompanyList}/>
                    <HomeRoutes/>
                </Switch>    
           </Router>
        // </div>
    )
}
     
export default StudentRoutes
