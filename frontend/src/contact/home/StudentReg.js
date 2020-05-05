import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import HomeNav from './HomeNav'
import logo from '../assets/logo.png'
class StudentReg extends Component {
  constructor(props) {
    super(props);

    this.state = {
       name:this.props.location.state.name,
       email:this.props.location.state.email,
       contact:"",
       dob:"",
       gender:"",
       college:"",
       department:"",
       address:"",
       isAuth: false,
     };

     this.onChange = this.onChange.bind(this);
 }
//  componentDidMount = async () => {
//   // getting user
//      const token = sessionStorage.getItem("token");
//      const config = {
//       headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//       },
//      };
//     const res = await axios.get(`http://localhost:5000/api/v1/auth/me`, config);

//      this.setState({ 
//     user: res.data.data._id,
//   });
// }
 onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
 }
 onSubmit = async (e) => {
  e.preventDefault();
  
  const register = {
     name:this.state.name,
     email: this.state.email,
     phone:this.state.contact,
     dob:this.state.dob,
     gender:this.state.gender,
     college:this.state.college,
     department:this.state.department,
     address:this.state.address
   };
  const body = JSON.stringify(register);
  const token = sessionStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    
 }
 console.log(token);
  try {
         const res = await axios.post(
                                      `http://localhost:5000/api/v1/students`,
                                       body,
                                       config
                                      );
        sessionStorage.setItem("isAuth", true);
        this.setState({
                       isAuth: true,
                     });
     }catch (error) {
                     alert("Sorry Something Wrong!!");
                    }
}
  render() {
    
    return (
      <Fragment>
      { this.state.isAuth ?
       ( <Redirect isAuth={this.state.isAuth} to="/student/s_dash" />
       ):
       (
      <div>
         <HomeNav/>
         <form method="post" onSubmit={this.onSubmit}>
            <div>
				       <div className="card card-header mx-auto col-md-6"> 
                  {/* <img src={logo} style={{width:'180px'}}></img> <hr/> */}
			            <h4 className="mx-auto text-blue mt-2">Let's start your Profesional Life</h4><hr/>
               
                  <input
                   type="text"
                   className="col-md-12"
                    name="name"
                    value={this.props.location.state.name}
                     disabled>
                     </input>
                  <input
                   type="text"
                    className="col-md-12"
                     name="email"
                     value={this.props.location.state.email}
                     disabled>
                      </input>
                 
                  <div className="row">
                    <input
                     type="text"
                      className="col-md-6 ml-3" 
                      placeholder="contact number"
                      name="contact" 
                      value={this.state.contact}
                      onChange={this.onChange} 
                      required></input>
                    <input 
                    type="date" 
                    className="col-md-5 ml-4" 
                    name="dob" 
                    value={this.state.dob}
                    onChange={this.onChange} 
                    required>
                    </input>
                  </div>
                                         
                  <div className="row">
                    <label class="radio-container">Male
                        <input 
                        type="radio" 
                        name="gender" 
                        value="Male"
                        onChange={this.onChange} />
                        <span class="checkmark"></span>
                     </label>
                     <label class="radio-container">Female
                        <input 
                        type="radio" 
                        name="gender" 
                        value="Female"
                        onChange={this.onChange} />
                        <span class="checkmark"></span>
                     </label>
                     <label class="radio-container">Transender
                        <input type="radio" 
                        name="gender" 
                        value="Transender"
                        onChange={this.onChange} />
                        <span class="checkmark"></span>
                    </label>
                  </div>

                  <div className="row">
                    <input 
                    type="text" 
                    className="col-md-6 ml-3" 
                    placeholder="college"
                    name="college" 
                    value={this.state.college}
                    onChange={this.onChange} 
                    required></input>
                    <input 
                    type="text" 
                    className="col-md-5 ml-4" 
                    placeholder="Department"
                    name="department" 
                    value={this.state.department}
                    onChange={this.onChange} 
                    required></input>
                  </div>

                  <textarea 
                  placeholder="Permanent Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange} >                  
                  </textarea>

                  <div className="row" style={{marginLeft:'22%'}}>
                           
                    {/* <Link to="/student/s_dash" className="mr-5 "></Link> */}
                    <input type="submit" className="btn btn-blue" value="Register" name="submit"></input>
                    <input type="reset" className="btn btn-dark col-md-3 ml-5" value="Reset"></input>
                  </div>
                  <p className="mx-auto"> Already have an account?<Link to="/slogin"> Sign In</Link></p>
					     </div>
            </div>
          </form>
        </div>
         )};
         </Fragment>
    )
  }

}
export default StudentReg
