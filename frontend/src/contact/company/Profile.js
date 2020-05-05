import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import company from '../assets/company.jpg'
import CompanyNav from './CompanyNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'


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
        
         <div>
             <CompanyNav/>
              <form method="post">
                 <div className="container">
                    <div className="row"> 
                      
                        <div className="col-md-8">
                           
                          <div className="card">
                              <div className="row ml-2">
                                          <div className='col-md-10'>
                                          <img src={company} alt="avatar" class="card_avatar mb-4"></img>
                                             <h5 className='text-blue'>{name}</h5>
                                             <h6 className='text-muted'>{email}</h6>    
                                             <h6 className='text-muted'>{phone}</h6> 
                                             <a className='text-muted' href={website}>{website}</a>  
                                          </div>
                                          <div className="">
                                          <Link to="/company/edit_profile" className='text-muted' ><i className='fa fa-pencil'></i> Edit</Link><br/>
                                          </div>
                               </div><hr/> 
                               <div className="row ml-2">
                                          <div className='col-md-10'>
                                            <h6 className='text-muted'>slug : {slug}</h6>
                                             <h6 className='text-muted'>{description}</h6>    
                                             <h6 className='text-muted'>address : {address}</h6>  
                                             
                                          </div>
                               </div><hr/> 
                          </div>                           
                        </div>
                
                        <div className="col-md-4">
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
