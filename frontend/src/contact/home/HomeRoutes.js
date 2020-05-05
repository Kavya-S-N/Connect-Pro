import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Home'
import S_login from './S_login'
import A_login from './A_login'
import C_login from './C_login'
import ForgottPass from './ForgotPassword'
import Reg from './Registration'
import StudentReg from './StudentReg'
import CompanyReg from './CompanyReg'
import StudentRoutes from '../student/StudentRoutes'
import CompanyRoutes from '../company/CompanyRoutes'
import AdminRoutes from '../admin/AdminRoutes'

const HomeRoutes =()=>
{
    return(
      
        <div>
            <Router>
               <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path={'/slogin'} component={S_login}/>
                  <Route path={'/clogin'} component={C_login}/>
                  <Route path={'/alogin'} component={A_login}/>
                  <Route path={'/forgotpassword'} component={ForgottPass}/>
                  <Route path={'/signup'} component={Reg}/>
                  <Route path={'/company_registration'} component={CompanyReg}/>
                  <Route path={'/student_registration'} component={StudentReg}/>
                  <Route path={'/company'} component={CompanyRoutes} />
                  <Route path={'/student'} component={StudentRoutes}/>
                  <Route path={'/admin'} component={AdminRoutes}/>
                </Switch>   
              </Router>
        </div>
    )
}
export default HomeRoutes
