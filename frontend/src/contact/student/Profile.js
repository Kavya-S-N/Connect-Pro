import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'


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
                        <div className="col-md-9" >
                           
                          <div className="card">
                              <div className="row ml-2">
                                          <div className='col-md-10'>
                                          <img src={avatar} alt="avatar" class="card_avatar mb-4"></img>
                                             <h5 className='text-blue'>{name}</h5><br/>
                                             <p className='text-muted'>{email}</p>    
                                             <p className='text-muted'>{phone}</p>  
                                          </div>
                                          <div className="">
                                          <Link to="/student/profile/edit" className='text-muted' ><i className='fa fa-pencil'></i> Edit</Link><br/>
                                          </div>
                               </div><hr/> 
                               <div className="row ml-2">
                                          <div className='col-md-10'>
                                             <p className='text-muted'>Date of Birth :  {dob}</p>
                                             <p className='text-muted'>Gender : {gender}</p>    
                                             <p className='text-muted'>College : {college}</p>  
                                             <p className='text-muted'>Department : {department}</p>  
                                             <p className='text-muted'>Address : {address}</p>  
                                          </div>
                               </div><hr/> 
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
export default Profile
