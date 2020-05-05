import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class ViewProject extends Component {
   state={
        project_id:this.props.location.state.project_id,
        student_id:this.props.location.state.student_id,
        project: [],
        student:[],
        delete:false,
        // getData:false,
        me:""
    };
   
    deleteProject = async () => {
        alert("You Want To Delete this Project?");
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          const res = await axios.delete(`http://localhost:5000/api/v1/projects/${this.state.project_id}`,config); 
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
          const res = await axios.get(`http://localhost:5000/api/v1/projects/${this.state.project_id}`,config); 
              this.setState({
                  project: res.data.data,
                  });
          const reslt = await axios.get(`http://localhost:5000/api/v1/students/${this.state.student_id}`,config); 
                this.setState({
                   student : reslt.data.data,
                  });
          
         //  console.log(this.state.projects);
          console.log(this.state.project);
               
      };
    render() {
        const {
            _id,
            title,
            description,
            technology,
            synopsis,
            category,
            developers,
            duration,
            guide,
            institution,
            price,
            createdAt,
            }= this.state.project;

            const{
             name,
             email,
             phone,
            }=this.state.student;
        return (
            <Fragment>
            { this.state.delete ?
       ( <Redirect to="/student/projects" />
       ):
       (
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                         <div className="row"> 
                         <div className="col-md-3"><LeftFixed /></div> 
                             <div className="col-md-9">
                          
                                <div className="card ">
                                   <h4 style={{fontWeight: 'bold'}} className='text-muted ml-3 mb-3'>{title}</h4>
                                      <div className="row ml-2 mr-2">
                                          <div className='col-md-10'>
                                             <p className='text-muted'>Department : IT</p>
                                             <p className='text-muted'>Date of upload : {createdAt}</p> 
                                             <p className='text-muted'>Price:{price}</p>   
                                          </div>
                                          <div className="">
                                             <Link to="/student/EditProject" className='text-muted' ><i className='fa fa-pencil'></i> Edit</Link><br/>
                                             <a className='text-muted' onClick={this.deleteProject}><i className='fa fa-trash-o'></i> Delete</a>
                                          </div>
                                       </div><hr/>

                                       <div className="row ml-3"><h6 className='text-muted'>Description : </h6></div>
                                        <div className="row ml-3"><p className='ml-3'>{description}</p></div><hr/>  
                                             
                                        <div className="row ml-3"><h6 className='text-muted'>Technology : </h6></div>
                                        <div className="row ml-3"><p className='ml-3'>{technology}</p></div><hr/>  

                                        <div className="row ml-3"><h6 className='text-muted'>Synopsis : </h6></div>
                                        <div className="row ml-3"><p className='ml-3'>{synopsis}</p></div><hr/>   

                                        <div className="row ml-3"><h6 className='text-muted'>Time Duration :</h6><p className='ml-3'>{duration}</p></div>  

                                        <div className="row ml-3"><h6 className='text-muted'>Guides : </h6><p className='ml-3'>{guide}</p></div>

                                        <div className="row ml-3"><h6 className='text-muted'>Institution : </h6><p className='ml-3'>{institution}</p></div><hr/>
                                        
                                        <div className="row ml-3"><h6 className='text-muted'>Posted By: </h6><p className='ml-3'>{name}</p></div> 
                                        
                                        <div className="row ml-3"><h6 className='text-muted'>Other Developers : </h6><p className='ml-3'>{developers}</p></div> 

                                        <div className="row ml-3"><h6 className='text-muted'>Contact : </h6><p className='ml-3'>{phone}</p></div>

                                        <div className="row ml-3"><h6 className='text-muted'>Email : </h6><p className='ml-3'>{email}</p></div>   

                                        
                                         

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
export default ViewProject
