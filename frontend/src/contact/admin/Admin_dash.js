import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'
import dev from '../assets/2-Web-Development-Banner-1.png'
import logo from '../assets/logo.png'
import company from '../assets/company.jpg'


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      profile: {},
      file: null,
    };
  }
  componentDidMount = async () => {
    // getting user
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(`http://localhost:5000/api/v1/auth/me`, config);

    this.setState({
      user: res.data.data,
    });
    // console.log(this.state.user);
    // user profile data
    // try {
    //   const reslt = await axios.get(
    //     `http://localhost:5000/api/v1/company/${this.state.user}/me`,
    //     config
    //   );
    //   this.setState({
    //    profile: reslt.data.data[0],
    //   });
    //   console.log(reslt.data.data[0]);
    // } catch (err) {
    //   console.log("Can't load the items");
    // }
    
  };
render() {
  try {
    const {
      name,
      phone,
      email,
      // address
  }=this.state.user;
    
  
    return (
      
        <div>
  
         <AdminNav/>
         <div>
            <div className="main-admin">
            <div className="row">
                 <div className="col-md-5 mt-5">
                  <br/><br/><br/><br/>
                  <h1 style={{ textShadow: "2px 2px 2px black",color:"rgb(34, 9, 92)"}}>Convert your Project<br/><br/>Into Product</h1>
                  </div>

                 
                  <div className="col-md-6 mt-5">
                     <br/><img  src={dev} style={{width:'100%'}}></img> 
                  </div>
              
               </div>
             </div>
           </div>
   </div>
                   
           
    )
}
catch (error) {
    alert("Sorry!!! you are not autherised to access this page");
    return (<Redirect to={{pathname:'/' }}/>)
  }
} 

}
export default Profile