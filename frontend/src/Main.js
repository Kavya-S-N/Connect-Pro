import React,{Fragment} from 'react'
import Home from './contact/home/Home'
import S_login from './contact/home/S_login'
import C_login from './contact/home/C_login'
import A_login from './contact/home/A_login'
import ForgottPass from './contact/home/ForgotPassword'
import Reg from './contact/home/Registration'
import StudentReg from './contact/home/StudentReg'
import CompanyReg from './contact/home/CompanyReg'
import StudentRoutes from './contact/student/StudentRoutes'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import CompanyRoutes from './contact/company/CompanyRoutes'
import AdminRoutes from './contact/admin/AdminRoutes'

class Main extends React.Component
{
  render()
  {
    return(
     
      <Router>
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path='/slogin' component={S_login}/>
                  <Route path='/clogin' component={C_login}/>
                  <Route path='/alogin' component={A_login}/>
                  <Route path='/forgotpassword' component={ForgottPass}/>
                  <Route path='/signup' component={Reg}/>
                  <Route path='/student_registration' component={StudentReg}/>
                  <Route path='/company_registration' component={CompanyReg}/>
                  <Route path={'/company'} component={CompanyRoutes} />
                  <Route path={'/student'} component={StudentRoutes}/>
                  <Route path={'/admin'} component={AdminRoutes}/>
                </Switch> 
      </Router>
   
    )
  }
}
export default Main