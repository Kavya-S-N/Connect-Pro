import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import HomeRoutes from '../home/HomeRoutes'
import C_dash from './C_dash'
import AddJob from './AddJob'
import ViewJob from './ViewJob'
import EditJob from './EditJob'
import ProjectCategories from './ProjectCategories'
import Projects from './Projects'
import ViewProject from './ViewProject'
import Jobs from './Jobs'
import CompanyList from './CompanyList'
import Profile from './Profile'
import EditProfile from './EditProfile'

class CompanyRoutes extends Component 
{
    render()
    {
    return(
        <Router>
                <Switch>
                   
                   <Route path={"/company/c_dash"} component={C_dash}/>
                   <Route path={"/company/add_job"} component={AddJob}/>
                   <Route path={"/company/view_job"} component={ViewJob}/>
                   <Route path={"/company/edit_job"} component={EditJob}/>
                   <Route path={"/company/jobs"} component={Jobs}/>
                   <Route path={"/company/department"} component={ProjectCategories}/>
                   <Route path={"/company/projects"} component={Projects}/>
                   <Route path={"/company/view_project"} component={ViewProject}/>
                   <Route path={"/company/company_list"} component={CompanyList}/>
                   <Route path={"/company/profile"} component={Profile}/>
                   <Route path={"/company/edit_profile"} component={EditProfile}/>
                   <HomeRoutes/>
               </Switch>    
        </Router>
       
    )
}
}
     
export default CompanyRoutes
