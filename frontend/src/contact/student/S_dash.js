import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import LeftFixed from './LeftFixed'
import RightFixed from './RightFixed'
import logo from '../assets/logo.png'

class S_dash extends Component {
   state = {
      jobs: [],
      job_id:"",
      company_id:"",
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
      const res = await axios.get(`http://localhost:5000/api/v1/jobs`, config);
        this.setState({
        jobs: res.data.data,
      });
        console.log(this.state.jobs);
             
    };
     
  onClick = async (id,company_id,e) => {
   e.preventDefault();
   this.setState({
         view:true,
         job_id:id,
         company_id:company_id,
   });
}

 render() {
   return (
      <Fragment>
      {this.state.view ?
      ( 
          (<Redirect view={this.state.view} 
            to={{pathname:'/student/jobs',
                    state:{job_id:this.state.job_id,
                     company_id:this.state.company_id}
                }} 
            />) 
         )
      : 
      (
      <div>
         <StudentNav />
         <form method="post">
           <div className="container">
               <div className="row"> 
               <div className="col-md-3">
                   <LeftFixed />
                </div>                
                     <div className="col-md-6">
                      <div className="card" > 
                         <Link to="/student/add_project" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                          ....Add New Project</Link>
                      </div>
                      <div className="text-center text-muted">Job Updates</div>
                      {this.state.jobs.map((job) => (
                       <div class="card">
                          <div class="row">
                             <h5 className="bold col-md-10">{job.title}</h5>
                             <div><a onClick={(e) =>this.onClick(job._id,job.company,e)}>
                             <i class="fa fa-eye" aria-hidden="true"></i>View</a>
                           </div>
                
                           <div class="card-body">
                              <p>Posted by: {job.company}</p>
                              <p className='text-muted'>CTC : {job.CTC}</p>
                           </div> 
                        </div>
                        </div>
                      ))}

                        
                 
                 </div>
                 <div className="col-md-3">
                  <RightFixed/>
                  </div>
               </div>
           </div>
         </form>
      </div>
            )}
            </Fragment>
   )
 }
}
export default S_dash
