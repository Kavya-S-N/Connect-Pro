import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'
// import RightFixed from './RightFixed'
// import LeftFixed from './LeftFixed'

class StudentList extends Component {
   state = {
      projects: [],
      project_id:"",
      project_name:"",
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
      const res = await axios.get(` http://localhost:5000/api/v1/projects`, config);
        this.setState({
        projects: res.data.data,
      });
        console.log(this.state.projects);
             
    };
    deleteProject = async (id,user, e) => {
      alert("You Want To Delete this Project?");
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await axios.delete(`http://localhost:5000/api/v1/projects/${id}`,config); 
          // const reslt=await axios.delete(`http://localhost:5000/api/v1/auth/${id}`,config)
          window.location.reload();
         } catch (error) {
          alert("something wrong");
         }
             
  }

    getprojectId = async (id,name, e) => {
      e.preventDefault();
      this.setState({
          project_id: id,
          project_name:name,
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
               to={{pathname:'/project/project/job',
                       state:{project_id:this.state.project_id,
                              project_name:this.state.project_name}
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

                           {/* <div className="card"> 
                            <Link to="/admin/add_project" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                            ....Add New Project</Link>
                             </div> */}
                          
                             {this.state.projects.map((project) => (
                                <div className="card ">
                                
                                     <div className="row ml-2">
                                          <div className='col-md-10'>
                                            <h5 className='text-blue'>{project.title}</h5>
                                            <a className='text-muted ml-2'>{project.developers}</a><br/>  
                                            <a className='text-muted ml-2'>Email : {project.email}</a><br/>  
                                             <a className='text-muted ml-2'>Contact : {project.phone}</a>  
                                          </div>
                                          
                                          <div className="col-md-1">
                                          {/* <a onClick={(e) =>this.getcatId(project._id,project.user, e)}> */}
                                            <h5><i className='fa fa-pencil'></i></h5>
                                            {/* </a>  */}
                                            </div>

                                            <div className="col-md-1">
                                          <a onClick={(e) =>this.deleteProject(project._id,project.user,e)}>
                                            <h5><i className='fa fa-trash-o'></i></h5></a> 
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
export default StudentList