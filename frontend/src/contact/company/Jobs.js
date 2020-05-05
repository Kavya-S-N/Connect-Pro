import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import CompanyNav from './CompanyNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class Jobs extends Component {
   state = {
      jobs: [],
      job_id:"",
      view:false,
      me:""
    };
    componentDidMount = async () => {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const reslt = await axios.get(`http://localhost:5000/api/v1/auth/me`, config); 
              this.setState({
                   me: reslt.data.data._id,
                 });
      const res = await axios.get(`http://localhost:5000/api/v1/company/${this.state.me}/jobs`, config);
        this.setState({
        jobs: res.data.data,
      });
        console.log(this.state.jobs);
             
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
            to={{pathname:'/company/view_job',
                    state:{job_id:this.state.job_id }
                }} 
            />) 
         )
      : 
      (
    
          <div>
                <CompanyNav/>
               <form method="post">
                   <div className="container">
                         <div className="row"> 
                         <div className="col-md-3" > 
                            <LeftFixed/>
                          </div>
                             <div className="col-md-9">
                             <div className="card"> 
                               <Link to="/company/add_job" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                               .......Post New Job</Link>
                            </div>
                          
                                <div className="card ">
                                     {/* <h4 style={{fontWeight: 'bold'}} className='text-muted mx-auto'>Department Name</h4><hr/> */}
                                     {this.state.jobs.map((job) => (<div>
                                     <div className="row ml-2">
                                          <div className='col-md-10'>
                                     <h5 className='text-blue'>{job.title}</h5>
                                     <p className='text-muted'>{job.qualification}</p>    
                                             <h6 className='text-muted'>CTC : {job.CTC}</h6>  
                                          </div>
                                          <div className="">
                                          <button className='btn btn-blue' 
                                             onClick={(e) =>
                                                this.onClick(job._id,e)
                                               }>View</button><br/>
                                          </div>
                                       </div><hr/></div>
                                       ))}
                                       
                                 </div>
                          
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
export default Jobs