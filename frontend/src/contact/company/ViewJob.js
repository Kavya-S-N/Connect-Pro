import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import CompanyNav from './CompanyNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class ViewJob extends Component {
    state={
        job_id:this.props.location.state.job_id,
        job: [],
        delete:false,
        // getData:false,
        me:""
    };
   
    deleteJob = async () => {
        alert("You Want To Delete this Job");
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          const res = await axios.delete(`http://localhost:5000/api/v1/jobs/${this.state.job_id}`,config); 
            this.setState({
                  delete:true,
                });
               
     }

    componentDidMount = async () => {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          const res = await axios.get(`http://localhost:5000/api/v1/jobs/${this.state.job_id}`,config); 
              this.setState({   
                  job: res.data.data,
                //   getData:true
                  });
       
         //  console.log(this.state.projects);
          console.log(this.state.job);
               
      };
    render() {
        const {
            title, 
            category,
             description,
             CTC,
             skils,
             qualification,
             createdAt            
        }=this.state.job;
        return ( 
            <Fragment>
            { this.state.delete ?
       ( <Redirect to="/company/jobs" />
       ):
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
                          
                                <div className="card ">
                                     <h4 style={{fontWeight: 'bold'}} className='text-muted ml-3 mb-3'>{title}</h4>
                                      <div className="row ml-2">
                                          <div className='col-md-10'>
                                             <h6 className='text-muted'></h6>
                                             <h6 className='text-muted'>CTC : {CTC}</h6> 
                                             <h6 className='text-muted'>Date of upload : {createdAt}</h6>    
                                          </div>
                                          <div className="">
                                             <Link to="/company/edit_job" className='text-muted' ><i className='fa fa-pencil'></i> Edit</Link><br/>
                                             <a className='text-muted' onClick={this.deleteJob}><i className='fa fa-trash-o'></i> Delete</a>
                                          </div>
                                       </div><hr/>

                                       <div className="row ml-3"><h6 className='text-muted'>Description</h6></div>
                                       <div className="row ml-4"><p>{description}</p></div><hr/>

                                       <div className="row ml-3"><h6 className='text-muted'>Skils</h6></div>
                                       <div className="row ml-4"><p>{skils}</p></div><hr/>
                                             
                                       <div className="row ml-3"><h6 className='text-muted'>Basic Qualification</h6></div>
                                       <div className="row ml-4"><p>{qualification}</p></div>

                                      
                                 </div>
                          
                             </div>

	                        {/* <div className="col-md-4">
                                 <RightFixed/>
                            </div> */}
                        </div>
                    </div>
                </form>
            </div> 
               )};
               </Fragment>
        )
    }

}
export default ViewJob
