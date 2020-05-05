import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from "axios";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
// import StudentNav from './StudentNav'
import logo from '../assets/logo.png'

class LeftFixed extends Component {
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
        user: res.data.data._id,
      });
      // console.log(this.state.user);
      // user profile data
      try {
        const reslt = await axios.get(
          `http://localhost:5000/api/v1/students/${this.state.user}/me`,
          config
        );
        this.setState({
         profile: reslt.data.data[0],
        });
        console.log(reslt.data.data[0]._id);
      } catch (err) {
        console.log("Can't load the items");
      }
      
    };
 render() {
  try {
   const {
      name,
      email,
      phone,
      dob,
      gender,
     college,
     department,
     address
    } = this.state.profile;
      return (
     
        <div style={{position: 'fixed',width:'18%'}}>
  
                         
    <Link to="/student/profile">
       <div className="card profile">
          <img src={avatar} alt="avatar" class="card_avatar"></img><hr/>
      <h5 className="bold text-blue">{name}</h5>
          <p className='text-muted'>{email}<br/>
          {phone}<br/>
          {department}<br/>
          {college}</p>
         </div>
      </Link>
     
      <div className="mt-5 ml-5 ">
            <Link to="/student/s_dash" style={{color:'black'}} className='text-muted'><p>Help</p></Link>
            <Link to="/student/s_dash" style={{color:'black'}} className='text-muted'><p>About Us</p></Link>
             <Link to="/student/s_dash" style={{color:'black'}} className='text-muted'><p>Contact</p></Link>
             <img src={logo} style={{width:'80px'}}></img> <i class="fa fa-copyright" aria-hidden="true"></i> 2020
       </div>
     </div>
                           
   )
  }
  catch (error) {
      alert("Sorry!! you are not Autherised to access this page");
      return (<Redirect to={{pathname:'/' }}/>)
    }
 }
}
export default LeftFixed
