import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'

class EditProfile extends Component {
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
        console.log(this.state.user);
        // user profile data
        try {
          const reslt = await axios.get(
            `http://localhost:5000/api/v1/students/${this.state.user}/me`,
            config
          );
          this.setState({
           profile: reslt.data.data[0],
          });
        } catch (err) {
          console.log("Can't load the items");
        }
        console.log(this.state.profile);
      };
    render() {
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
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                       <div className="row"> 
                         <div className="col-md-9">
                             <div className="card"> 
                	            <h4 className="mx-auto text-blue mt-2">Edit Your Details</h4><hr/>
               
                                 <input type="text" className="col-md-12" placeholder="Name" value={name} required></input>
                                 <input type="text" className="col-md-12" placeholder="Email Address" value={email} required ></input>
                 
                                <div className="row">
                                   <input type="text" className="col-md-6 ml-3" placeholder="contact number" value={phone} required></input>
                                   <input type="date" className="col-md-5 ml-4" value={dob} required></input>
                                </div>
                                         
                                 <div className="row">
                                    <label class="radio-container">Male
                                       <input type="radio" checked="checked" name="radio" value="Male"/>
                                       <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-container">Female
                                        <input type="radio" name="radio" value="Female"/>
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="radio-container">Transender
                                       <input type="radio" name="radio" value="Transender"/>
                                       <span class="checkmark"></span>
                                    </label>
                                 </div>

                                <div className="row">
                                   <input type="text" className="col-md-6 ml-3" placeholder="college " value={college} required></input>
                                   <input type="text" className="col-md-5 ml-4" placeholder="Department" value={department} required></input>
                                </div>

                                 <textarea placeholder="Permanent Address" value={address}></textarea>

                                 <div className="row" style={{marginLeft:'22%'}}>
                                    <Link to="/student/profile" className="mr-5 ml-r "><input type="reset" className="btn btn-blue " value=" Edit "></input></Link>
                                    <input type="reset" className="btn btn-dark ml-5" value="Clear"></input>
                                 </div>
                 
					                    </div>      
                          
                             </div>

	                           
                             <div className="col-md-3">
                                <RightFixed/>
                             </div>
                             
                        </div>
                    </div>
                </form>
            </div> 
        )
    }

}
export default EditProfile
