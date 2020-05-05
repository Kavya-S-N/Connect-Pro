import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import HomeNav from './HomeNav'
class S_login extends Component {
   constructor(props) {
      super(props);

      this.state = {
         email: "",
         password: "",
        //  type: "",
         isAuth: false,
       };

       this.onChange = this.onChange.bind(this);
   }
  //  componentDidMount() {
  //     this.setState({
  //       type: this.props.match.params.type,
  //     });
  //   }
 // Input on change
 onChange(e) {
   this.setState({
     [e.target.name]: e.target.value,
   });
  
 }
// Login
onSubmit = async (e) => {
   e.preventDefault();

   const login = {
     email: this.state.email,
     password: this.state.password,
   };

   const body = JSON.stringify(login);
   const config = {
     headers: {
       "Content-Type": "application/json",
     },
   };
   // console.log(body);
   try {
     const res = await axios.post(
       `http://localhost:5000/api/v1/auth/login`,
       body,
       config
     );
     console.log(res.data.token);
     sessionStorage.setItem("token", res.data.token);
     sessionStorage.setItem("isAuth", true);
     // console.log(sessionStorage);
     this.setState({
       isAuth: true,
     });
   } catch (error) {
     alert("Error Login!!");
   }
 };
    render() {
   //  const type = this.state.type;
    console.log(this.state.isAuth);
        return (
           <Fragment>
              {this.state.isAuth ? (<Redirect isAuth={this.state.isAuth} to="/student/s_dash" />
              ): (
                 <div>
               <HomeNav/>
               <form method="post" onSubmit={this.onSubmit}>
                  <div><br/><br/>
                      <div className="card card-header mx-auto col-md-4"> 
                          {/* <img  className='justify-left' src={logo} style={{width:'180px'}}></img> <hr/> */}
                          <h4 className="text-center text-blue mt-3">Sign Into Your Account</h4><hr/>
                                              
                          <div className="row">
                             <h4><i className=' col-md-2 ml-5 mt-4 fa fa-envelope'></i></h4>
                             <input 
                             type="text" 
                             className="col-md-7"
                             name="email"
                             placeholder="Email Address"
                             value={this.state.email}
                             onChange={this.onChange} 
                             required></input>
                          </div>
                        
                          <div className="row">
                             <h4><i className=' col-md-1 ml-5 mt-4 fa fa-key'></i></h4>
                             <input
                              type="password"
                              id="password"
                              className="col-md-7"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.onChange}
                               required></input>
                          </div>
                 
                          <Link to="/forgotpassword" className="mx-auto">Forgot password?</Link><br/>
                 
                          {/* <Link to="/student/s_dash" className="btn col-md-8 mx-auto btn-blue">Sign In</Link><br/> */}
                          <button
                              type="submit"
                              value="Login"
                              name="submit"
                              className="btn col-md-8 mx-auto btn-blue"
                            >
                              Login
                            </button><br/>
                          <p className="mx-auto"> Don't have an account?<Link to="/signup">Sign Up</Link></p>
                 
                        </div>
                   </div>
              </form>
              </div>
              )};
           </Fragment>
        )
    }
}
export default S_login
