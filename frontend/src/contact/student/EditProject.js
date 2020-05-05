import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class EditProject extends Component {
    render() {
        return (
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                         <div className="row"> 
                         <div className="col-md-3"><LeftFixed /></div> 
                             <div className="col-md-9">
                          
                                <div className="card ">
                               
                                   <input type="text" className="col-md-12" placeholder="Project Title" required></input>
                                  <textarea placeholder="Description"></textarea>
                                  <input type="text" className="col-md-12" placeholder="Department" required></input>
                                  <textarea placeholder="Technology Used" className="mt-3"></textarea>
                                  <textarea placeholder="Project Synopsis" className="mt-3"></textarea>
                                  <textarea placeholder="Developers" className="mt-3"></textarea>                         
                                  <input type="text" className="col-md-12" placeholder="Time Duration" required></input>
                                  
                                    
                                   <div className="row">
                                      <input type="text" className="col-md-5 ml-3" placeholder="Guide" required></input>
                                      <input type="text" className="col-md-6 ml-4" placeholder="Institution" required></input> 
                                   </div><hr/>
                                   <input type="text" className="col-md-12" placeholder="Contact Number" required></input>
                                   <input type="text" className="col-md-12" placeholder="Email" required></input>  
                                   <input type="text" className="col-md-12" placeholder="Price /-" required></input>     



                                    <div className="row" style={{marginLeft:'22%'}}>
                                        <Link to="/student/ViewProject" className="mr-5 "><input type="submit" className="btn btn-blue" value="Upload"></input></Link>
                                        <Link to="/student/ViewProject" className="mr-5 "> <input type="button" className="btn btn-dark" value="Cancel"></input></Link>
                                    </div>
    
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
export default EditProject
