import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class S_Projects extends Component {
        state = {
            me:"",
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
             const reslt = await axios.get(`http://localhost:5000/api/v1/auth/me`, config); 
              this.setState({
                   me: reslt.data.data._id,
                 });
           const res = await axios.get(`http://localhost:5000/api/v1/students/${this.state.me}/projects`, config);   
           this.setState({
               projects: res.data.data,
           });        
            //  console.log(this.state.projects);
             console.log(this.state.me);
                  
         };
         getProjectId = async (id,student_id, e) => {
            e.preventDefault();
            this.setState({
                project_id: id,
                student_id:student_id,
                view:true,
            });
            // console.log(user)
        }
    render() {
        return (
            <Fragment>
            {this.state.view ?
            ( 
                (<Redirect view={this.state.view} 
                  to={{pathname:'/student/ViewProject',
                          state:{project_id:this.state.project_id,
                                 student_id:this.state.student_id}
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
                                
                             <div className="card"> 
                         <Link to="/student/add_project" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                          ....Add New Project</Link>
                      </div>

                      {this.state.projects.map((project) => (
                                <div className="card ">
                                <div className="row ml-2">
                                          <div className='col-md-10'>
                                              {/* {this.setState({project_id:project._id})} */}
                                             <h5 className='text-blue mb-3'>{project.title}</h5>
                                             <p className='text-muted ml-2'>{project.description}</p>    
                                             <h6 className='text-muted ml-2'>{project.price} /- </h6>  
                                          </div>
                                          <div className="">
                                            <button className='btn btn-blue'
                                            onClick={(e) =>
                                                this.getProjectId(project._id,project.student,e)
                                               }
                                            >View
                                              </button><br/>
                                          </div>
                                       </div> 
                                       </div> 
                                       ))}                                  
                             
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
export default S_Projects
