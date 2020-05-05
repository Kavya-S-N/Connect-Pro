import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class JobofCompany extends Component {
   state = {
      jobs: [],
      company_id:this.props.location.state.company_id,
      company_name:this.props.location.state.company_name,
      job_id:"",
       view:false
   };
   componentDidMount = async () => {
     const token = sessionStorage.getItem("token");
     const config = {
       headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       };

     const res = await axios.get(`http://localhost:5000/api/v1/company/${this.state.company_id}/jobs`, config);   
     this.setState({
         jobs: res.data.data,
     });        
       console.log(this.state.company_id);
      //  console.log(this.state.me);
            
   };
  
  onClick = async (id,e) => {
   e.preventDefault();
   this.setState({
         view:true,
         job_id:id
   });
}
render() {
  return (
      <Fragment>
      {this.state.view ?
      ( 
          (<Redirect view={this.state.view} 
            to={{pathname:'/student/jobs',
                    state:{job_id:this.state.job_id }
                }} 
            />) 
         )
      : 
      ( 
    
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                         <div className="row"> 
                         <div className="col-md-3"><LeftFixed /></div> 
                             <div className="col-md-9">
                          
                            
                                <div className="card ">
                                <h4 style={{fontWeight: 'bold'}} className='text-blue ml-3 mb-4'>{this.state.company_name}</h4>
                                     {this.state.jobs.map((job) => (
                                     <div><div className="row ml-2">
                                          <div className='col-md-10'>
                                             <h5 className='text-muted'>{job.title}</h5>
                                             <h6 className='text-muted'>{job.qualification}</h6>    
                                             <h6 className='text-muted'>{job.CTC}</h6>  
                                          </div>
                                          <div className="">
                                             <button className='btn btn-blue' 
                                             onClick={(e) =>
                                                this.onClick(job._id,e)
                                               }>View</button><br/>
                                          </div>
                                       </div> <hr/> </div>
                                        ))}   
                                    </div>
                                   
                             </div>

	                        {/* <div className="col-md-4">
                              <RightFixed/>
                           </div> */}
                        </div>
                    </div>
                </form>
            </div> 
            )}
                        </Fragment>
        )
    }

}
export default JobofCompany