import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import CompanyNav from './CompanyNav'
import LeftFixed from './LeftFixed'

class ViewProject extends Component {
    state = {
        project: [],
        project_id:this.props.location.state.project_id,
        student_id:this.props.location.state.student_id,
        student:[]
      
     };
    
     componentDidMount = async () => {

       const token = sessionStorage.getItem("token");
       const config = {
         headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
           },
         };
  
       const res = await axios.get(`http://localhost:5000/api/v1/projects/${this.state.project_id}`, config);   
       this.setState({
           project: res.data.data,
       });     
       const reslt = await axios.get(`http://localhost:5000/api/v1/students/${this.state.student_id}`,config); 
       this.setState({
          student : reslt.data.data,
         }); 
        
       console.log(this.state.project_id);
       console.log(this.state.student_id)
              
     };
    render() {
        const {
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
          createdAt
        }= this.state.project;

        const{
          name,
          email,
          phone,
         }=this.state.student;
  
        return (
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
                                     <h4 style={{fontWeight: 'bold'}} className='text-muted ml-3 mb-3'>{title}</h4><br/>
                                      <div className="row ml-2">
                                          <div className='col-md-9'>
                                             <h6 className='text-muted'>Department : IT</h6>
                                             <h6 className='text-muted'>Date of upload : {createdAt}</h6>    
                                          </div>
                                          <div className="">
                                          <h6 className='text-muted'>Price : {price}</h6>
                                          </div>
                                       </div><hr/>

                                        <div className="row ml-4"><h6 className='text-muted'>Project Synopsis</h6></div>
                                       <div className="row ml-5"><p>{synopsis}</p></div><hr/> 

                                       <div className="row ml-4"><h6 className='text-muted'>Description</h6></div>
                                       <div className="row ml-5"><p>{description}</p></div><hr/>
                                             
                                       <div className="row ml-4"><h6 className='text-muted'>Technology</h6></div>
                                       <div className="row ml-5"><p>{technology}</p></div><hr/>    
                                        
                                       <div className="row ml-4"><h6 className='text-muted'>Posted By</h6></div>
                                          <div className="row ml-5"><p>{name}</p></div>
                                         
                                         <div className="row ml-4"><h6 className='text-muted'>Other developers</h6></div>
                                          <div className="row ml-5"><p>{developers}</p></div><hr/> 
                                             
                                          <div className="row ml-4"><h6 className='text-muted'>Contact Details</h6></div><br/>
                                          <div className="row ml-5"><p>{email}</p></div>
                                          <div className="row ml-5"><p>{phone}</p></div><hr/>
                                           

                                         
                                 </div>
                          
                             </div>
                        </div>
                    </div>
                </form>
            </div> 
        )
    }

}
export default ViewProject
