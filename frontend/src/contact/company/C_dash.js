import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import CompanyNav from './CompanyNav'
import logo from '../assets/logo.png'
import LeftFixed from './LeftFixed';

class C_dash extends Component {
   state = {
       projects: [],
      project_id:"",
      student_id:"",
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
      
     const res = await axios.get(`http://localhost:5000/api/v1/projects`, config);   
     this.setState({
         projects: res.data.data,
     });        
     
            
   };
   getProjectId = async (id,student,e) => {
      e.preventDefault();
      this.setState({
          project_id: id,
          student_id:student,
          view:true,
      });
      console.log(id)
  }
render() {
  return (
      <Fragment>
      {this.state.view ?
      ( 
          (<Redirect view={this.state.view} 
            to={{pathname:'/company/view_project',
                    state:{project_id:this.state.project_id,
                      student_id:this.state.student_id}
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

                            
                      
                            {this.state.projects.map((project) => (
                            <div class="card">
                               <div class="row">
                                  <h5 className="bold col-md-11">{project.title}</h5>
                                  <a  onClick={(e) =>
                                                this.getProjectId(project._id,project.student,e)
                                               }><i class="fa fa-eye" aria-hidden="true"></i>view</a>
                                  
                               </div>
                
                               <div class="">
                                             <p className='text-muted'>{project.synopsis}</p>
                                             <p className='text-muted'>{project.price}</p>
                               </div> 
                            </div>
                             ))}  

                           

                            
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
export default C_dash
