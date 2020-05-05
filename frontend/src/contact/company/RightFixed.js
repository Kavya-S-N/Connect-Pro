import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'


class RightFixed extends Component {
    state = {
        projects: [],
       project_id:"",
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
    getProjectId = async (id, e) => {
       e.preventDefault();
       this.setState({
           project_id: id,
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
                     state:{project_id:this.state.project_id}
                 }} 
             />) 
          )
       : 
       (
                             <div >
                                 <div className="card"> 
                                     <Link to="/company/add_job" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                                      ....Post New Job</Link>
                                 </div>
                      
                                
                                 {/* <div class="card">
                                 {this.state.projects.map((project) => (
                                 <div>
                                    <div class=" row">
                                      <h6 className="bold col-md-10">{project.title}</h6>
                                      <a className="text-blue" onClick={(e) =>
                                                this.getProjectId(project._id, e)
                                               }>View</a>
                                    </div><hr/>
                                   </div> 
                                    ))}   

                                   </div>*/}
                        
                          <div className="card"> 
                          <p style={{fontWeight: 'bold'}} className='text-muted'>Projects</p>
                         
                          <div className='project-list'>
                          {this.state.projects.map((project) => (
                               <div> <a onClick={(e) =>
                                this.getProjectId(project._id, e)
                                }><p>{project.title}</p></a><hr/></div>
                               ))}
                               
                           </div>
                     </div>
                  </div> 
                                 
                       
            
            )}
                         
             </Fragment> 
                             
               
        )
    }

}
export default RightFixed
