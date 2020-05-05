import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import AdminNav from './AdminNav'
import logo from '../assets/logo.png'
class AddCompany extends Component {
  constructor(props) {
    super(props);

    this.state={
      name:"",
      slug:"",
      description:"",
      website:"",
      phone:"",
      email:"",
      address:"",
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

  const register={
    name:this.state.name,
    slug:this.state.slug,
    description:this.state.description,
    website:this.state.website,
    phone:this.state.phone,
    email:this.state.email,
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
                                 `http://localhost:5000/api/v1/company`,
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
       ( <Redirect isAuth={this.state.isAuth} to="/admin/companylist" />
       ):
       (
      <div>
        <AdminNav/>
           <div className="main-admin mt-5">  
        <form method="post" onSubmit={this.onSubmit}>
          <div>
				    <div className="card card-header col-md-11"> 
            
			        <h4 className="text-blue mt-2">Add Company Details</h4><hr/>
               
               
               
                <input 
                type="text" 
                className="col-md-12" 
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                 placeholder="company name"/>

                <textarea 
                placeholder="Discription"
                name="description" 
                value={this.state.description}
                onChange={this.onChange}>
                </textarea>
                      
               <div className="row">
                 <input 
                 type="text" 
                 className="col-md-7 ml-3" 
                 placeholder="website" 
                 name="website" 
                 value={this.state.website}
                 onChange={this.onChange}
                 required />

                 <input 
                 type="text" 
                 className="col-md-4 ml-4" 
                 placeholder="Add slug"
                 name="slug" 
                value={this.state.slug}
                onChange={this.onChange} 
                 required />
                </div>

                <div className="row">
                  <input 
                  type="text" 
                  className="col-md-6 ml-3" 
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                 placeholder="company email"
                  />
                  
                  <input 
                  type="text" 
                  className="col-md-5 ml-4" 
                  placeholder="contact number"
                  name="phone" 
                  value={this.state.phone}
                  onChange={this.onChange} 
                  required/>
                </div>
                                         
               <textarea 
               placeholder="Address"
               name="address" 
               value={this.state.address}
               onChange={this.onChange}>
               </textarea>

                <div className="row mx-auto" style={{marginLeft:'22%'}}>
                 <input type="submit" className="btn btn-blue mr-5" value="Register" name="submit"></input>
                  <input type="reset" className="btn btn-dark  ml-5" value="Reset"></input>
                </div>
                
					  </div>
          </div>
        </form>
     </div>
      </div>
      )};
      </Fragment>
    )
  }

}
export default AddCompany
