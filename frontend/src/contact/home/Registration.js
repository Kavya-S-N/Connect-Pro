import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import HomeNav from './HomeNav'

class Registration extends Component {
   constructor(props) {
      super(props);

      this.state = {
         name:"",
         email: "",
         role:"",
         password: "",
        //  type: "",
         isAuth: false,
       };

       this.onChange = this.onChange.bind(this);
   }
   onChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
   }
   onSubmit = async (e) => {
      e.preventDefault();
      // console.log(this.state.role)
      const register = {
         name:this.state.name,
         email: this.state.email,
         role:this.state.role,
         password: this.state.password,
       };
       const body = JSON.stringify(register);
       const config = {
         headers: {
           "Content-Type": "application/json",
         },
       };
       try {
         const res = await axios.post(
           `http://localhost:5000/api/v1/auth/register`,
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
         alert("Sorry Something Wrong!!");
       }
   }
   render() {
      const role=this.state.role;
      console.log(this.state.isAuth);
         return (
            <Fragment>
              {this.state.isAuth ?
              ( role == "student" ?
                (<Redirect isAuth={this.state.isAuth} 
                    to={{pathname:'/student_registration',
                            state:{name:this.state.name,
                                  email:this.state.email
                                  }
                        }} 
                    />) 
                 :(<Redirect isAuth={this.state.isAuth}
                      to={{pathname:'/company_registration',
                              state:{name:this.state.name,
                                    email:this.state.email
                                    }
                         }}
                   />)
              ): 
              (
              <div>
             <HomeNav/>
               <form method="post" onSubmit={this.onSubmit}>
                  <div >
    				   <div className="card card-header mx-auto col-md-4 mt-4"> 
                         {/* <img  className='justify-left' src={logo} style={{width:'180px'}}></img> <hr/> */}
		     	          <h4 className="mx-auto text-blue mt-2">Let’s get started</h4><hr/>
               
                          <div className="row">
                             <h3><i className='col-md-1 ml-5 mt-4 fa fa-user'></i></h3>
                             <input
                              type="text"
                              className="col-md-7"
                               placeholder="Name"
                               name="name"
                               value={this.state.name}
                               onChange={this.onChange} 
                                required></input>
                         </div>
                        
                          <div className="row">
                              <h4><i className=' col-md-2 ml-5 mt-4 fa fa-envelope'></i></h4>
                              <input 
                              type="text"
                               className="col-md-7"
                                placeholder="Email Address"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}  
                                required></input>
                          </div>
                        
                          <label style={{marginLeft:"80px"}}>I am a....</label>
                             <div className="row" style={{marginLeft:"60px"}}>
                                  <label class="radio-container">Student
                                     <input type="radio"
                                      name="role"
                                       value="student"
                                       onChange={this.onChange}  />
                                     <span class="checkmark"></span>
                                  </label>
                                  <label class="radio-container">Company
                                      <input type="radio"
                                       name="role" 
                                       value="company"
                                       onChange={this.onChange}  />
                                      <span class="checkmark"></span>
                                   </label>
                              </div>
                        
                           <div className="row">
                              <h3><i className=' col-md-1 ml-5 mt-4 fa fa-key'></i></h3>
                              <input 
                              type="password"
                               className="col-md-7"
                                placeholder="Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange} 
                                 required></input>
                          </div><br/>
                           
                          <button
                              type="submit"
                              value="signup"
                              name="submit"
                              className="btn col-md-8 mx-auto btn-blue"
                            >
                              Sign Up
                            </button><br/>
                          {/* <Link to="/student_registration" className="btn col-md-8 mx-auto btn-blue">Sign Up</Link><br/> */}
                          {/* <Link to="/company_registration" className="btn col-md-8 mx-auto btn-blue">Company Sign Up</Link><br/> */}

                          {/* <xp className="mx-auto"> Already have an account?<Link to="/login">Sign In</Link></xp> */}
                       </div>
                    </div>
                </form>
           </div>
           )};
         </Fragment>
					 
        )
    }

}
export default Registration
