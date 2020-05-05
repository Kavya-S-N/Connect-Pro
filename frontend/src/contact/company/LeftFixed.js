import React, { Component } from 'react'
import {Redirect,Link} from 'react-router-dom'
import axios from "axios";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import logo from '../assets/logo.png'
import company from '../assets/company.jpg'

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
            `http://localhost:5000/api/v1/company/${this.state.user}/me`,
            config
          );
          this.setState({
           profile: reslt.data.data[0],
          });
          console.log(reslt.data.data[0]);
        } catch (err) {
          console.log("Can't load the items");
        }
        
      };
    render() {
      try {
        const {
          name,
          slug,
          description,
          website,
          phone,
          email,
          address
      }=this.state.profile;
        
      
        return (
          
            <div style={{position: 'fixed',width:'18%'}}>
      
                
                             
            <div className="card profile" >
                <Link to="/company/profile" > 
                <img src={company} alt="cs" style={{width:'200px'}}/>
                <h5 className="bold text-blue mt-4">{name}</h5>
                <p className='text-muted'>{email}<br/>
                 {website}<br/>
                 {phone}</p></Link>
            </div>
          

            <div className="mt-4 ml-5 ">
                 <Link to="/" style={{color:'black'}} className='text-muted'><p>Help</p></Link>
                 <Link to="/" style={{color:'black'}} className='text-muted'><p>About Us</p></Link>
                  <Link to="/" style={{color:'black'}} className='text-muted'><p>Contact</p></Link>
                  <img src={logo} style={{width:'80px'}}></img> <i class="fa fa-copyright" aria-hidden="true"></i> 2020
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
export default LeftFixed
