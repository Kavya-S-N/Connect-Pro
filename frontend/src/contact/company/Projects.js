import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import CompanyNav from './CompanyNav'
import LeftFixed from './LeftFixed'

class Projects extends Component {
   state = {
      projects: [],
      category_id:this.props.location.state.category_id,
      catname:this.props.location.state.catname,
      project_id:"",
      // student:{},
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

     const res = await axios.get(`http://localhost:5000/api/v1/category/${this.state.category_id}/projects`, config);   
     this.setState({
         projects: res.data.data,
        //  student:res.data.data.student,
     });        
      
    //  console.log(this.state.student);
     console.log(this.state.projects);
            
   };
   getProjectId = async (id,student,e) => {
      e.preventDefault();
      this.setState({
         project_id: id,
        //  student:student,
          view:true,
      });
      // console.log(this.state.student)
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
                          
                                <div className="card ">
                               <h4 className='text-muted mb-3 mx-auto'>{this.state.catname}</h4><hr/>
                                {this.state.projects.map((project) => ( 
                                    <div>
                                    <div className="row ml-2">
                                       
                                          <div className='col-md-10'>
                                             <h5 className='text-blue mb-3'>{project.title}</h5>
                                             <h6 className='text-muted ml-2'>Technology : {project.technology}</h6>    
                                             <h6 className='text-muted ml-2'>price : {project.price}</h6>  
                                          </div>
                                          <div className="">
                                             <a className='btn btn-blue text-white'
                                              onClick={(e) =>this.getProjectId(project._id,project.student,e)} >View</a><br/>
                                          </div>
                                       </div><hr/>
                                     </div>
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
export default Projects
