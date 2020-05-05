import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class CategoryJobList extends Component {
    render() {
        return (
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                         <div className="row"> 
                            <LeftFixed/>
                             <div className="col-md-8 ml-5">
                          
                                <div className="card ">
                                     <h4 style={{fontWeight: 'bold'}} className='text-muted mx-auto'>Department Name</h4><hr/>
                                     <div className="row ml-2">
                                          <div className='col-md-10'>
                                             <h5 className='text-blue'>Job Title</h5>
                                             <h6 className='text-muted'>small description</h6>    
                                             <h6 className='text-muted'>CTC</h6>  
                                          </div>
                                          <div className="">
                                             <Link to="/student/jobs" className='btn btn-blue' >View</Link><br/>
                                          </div>
                                       </div><hr/>     

                                       <div className="row ml-2">
                                          <div className='col-md-10'>
                                             <h5 className='text-blue'>Job Title</h5>
                                             <h6 className='text-muted'>small description</h6>    
                                             <h6 className='text-muted'>CTC</h6>  
                                          </div>
                                          <div className="">
                                             <Link to="/student/jobs" className='btn btn-blue' >View</Link><br/>
                                          </div>
                                       </div><hr/> 

                                       <div className="row ml-2">
                                          <div className='col-md-10'>
                                             <h5 className='text-blue'>Job Title</h5>
                                             <h6 className='text-muted'>small description</h6>    
                                             <h6 className='text-muted'>CTC</h6>  
                                          </div>
                                          <div className="">
                                             <Link to="/student/jobs" className='btn btn-blue' >View</Link><br/>
                                          </div>
                                       </div><hr/>                          

                                 </div>
                          
                             </div>

	                       
                           
                           
                        </div>
                    </div>
                </form>
            </div> 
        )
    }

}
export default CategoryJobList