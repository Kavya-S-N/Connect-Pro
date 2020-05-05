import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'
// import LeftFixed from './LeftFixed'
// import RightFixed from './RightFixed'
import logo from '../assets/logo.png'

class JobList extends Component {
   state = {
      jobs: [],
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
      const res = await axios.get(`http://localhost:5000/api/v1/jobs`, config);
        this.setState({
        jobs: res.data.data,
      });
        console.log(this.state.jobs);
             
    };
     
    deleteCompany = async (id,user, e) => {
      alert("You Want To Delete this Project?");
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await axios.delete(`http://localhost:5000/api/v1/jobs/${id}`,config); 
          // const reslt=await axios.delete(`http://localhost:5000/api/v1/auth/${id}`,config)
          window.location.reload();
         } catch (error) {
          alert("something wrong");
         }
             
  }

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
               <AdminNav/>
               <form method="post">
                   <div className="main-admin">
                         <div className="row"> 
                         {/* <div className="col-md-3"><LeftFixed /></div>  */}
                             <div className="col-md-11">
                          
                           <div className="card"> 
                            <Link to="/admin/add_job" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                            ....Add New Job</Link>
                            </div>

                            <div className="card ">
                             {this.state.jobs.map((job) => (
                               
                                <div>
                                     <div className="row ml-2">
                                          <div className='col-md-10'>
                                            <h5 className='text-blue'>{job.title}</h5>
                                            <a className='text-muted ml-2'>{job.company}</a><br/>  
                                            
                                          </div>
                                          <div className="col-md-1">
                                          {/* <a onClick={(e) =>this.getcatId(job._id,job.user, e)}> */}
                                            <h5><i className='fa fa-pencil'></i></h5>
                                            {/* </a>  */}
                                            </div>

                                            <div className="col-md-1">
                                          <a onClick={(e) =>this.deleteCompany(job._id,job.user,e)}>
                                            <h5><i className='fa fa-trash-o'></i></h5></a> 
                                            </div>

                                       </div><hr/>
                                </div>
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
export default JobList
