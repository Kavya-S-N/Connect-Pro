import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class ViewJob extends Component {
    state = {
        jobs: [],
        job_id:this.props.location.state.job_id,
        company_id:this.props.location.state.company_id,
        company:[],
        apply:false
     };
     componentDidMount = async () => {
       const token = sessionStorage.getItem("token");
       const config = {
         headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
           },
         };
  
       const res = await axios.get(`http://localhost:5000/api/v1/jobs/${this.state.job_id}`, config);   
       this.setState({
           jobs: res.data.data,
       });        
         
         const rslt = await axios.get(`http://localhost:5000/api/v1/company/${this.state.company_id}`, config);   
         this.setState({
             company: rslt.data.data,
         });  
         console.log(this.state.company);    
     };
    //  getProjectId = async (user, e) => {
    //     e.preventDefault();
    //     this.setState({
    //         project_id: user,
    //         view:true,
    //     });
        // console.log(user)
    // }
//     onClick = async (e) => {
//      e.preventDefault();
//      this.setState({
//            apply:true,
//      });
//   }
    render() {
        const {
        title,
        description,
        CTC,
        skils,
        createdAt
        }= this.state.jobs;

        const {
            name,
            website,
            phone,
            email
        }=this.state.company;
        
        return (
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                         <div className="row"> 
                         <div className="col-md-3"><LeftFixed /></div> 
                             <div className="col-md-9">
                          
                                <div className="card ">
                                   <div className="row ml-2 mb-5">
                                     <h4 style={{fontWeight: 'bold'}} className='text-muted col-md-10'>{title}</h4>
                                     <Link to="/student/jobs" className='btn btn-blue'>Apply</Link><br/>
                                   </div>
                                      <div className="row ml-2">
                                          <div className='col-md-7'>
                                             <h6 className='text-muted'>{name}</h6>
                                             <a className='text-muted' href={website} >{website}</a><br/>
                                             <h6 className='text-muted'> {phone}</h6>
                                                 
                                          </div>
                                          <div className="">
                                             <h6 className='text-muted'>CTC : {CTC}</h6> 
                                             <h6 className='text-muted'>Date of upload : {createdAt}</h6>
                                          </div>
                                       </div><hr/>

                                       <div className="row ml-2"><h6 className='text-muted'>Description</h6></div>
                                       <div className="row ml-3"><p className="row ml-3">{description}</p></div><hr/>
                                              
                                        

                                        <div className="row ml-3"><h6 className='text-muted'>Skils</h6></div>
                                        <div className="row ml-3"><p className="row ml-3">{skils}</p></div><hr/>     
                                              

                                         <div className="row ml-3"><h6 className='text-muted'>Basic Qualification</h6></div>
                                         <div className="row ml-3"><p className="row ml-3">{description}</p></div><hr/> 

                                 </div>
                          
                             </div>

	                        {/* <div className="col-md-4">
                                 <RightFixed/>
                            </div> */}
                        </div>
                    </div>
                </form>
            </div> 
        )
    }

}
export default ViewJob
