import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import CompanyNav from './CompanyNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class EditJob extends Component {
    render() {
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
                                <h5 style={{fontWeight: 'bold'}} className='text-muted mb-4 ml-2'>Edit Job</h5>
                                   <input type="text" className="col-md-12" placeholder="Job Title" required></input>
                                  <textarea placeholder="Description"></textarea>
                                  <input type="text" className="col-md-12" placeholder="Category" required></input>
                                  <textarea placeholder="Skils Required" className="mt-3"></textarea>
                                  <textarea placeholder="Qualification Required" className="mt-3"></textarea>
                                  <input type="text" className="col-md-12" placeholder="CTC" required></input>
                                  
                                    
     
                                    <div className="row" style={{marginLeft:'22%'}}>
                                        <Link to="/company/view_job" className="mr-5 "><input type="submit" className="btn btn-blue" value="Upload"></input></Link>
                                        <Link to="/company/view_job" className="mr-5 "> <input type="button" className="btn btn-dark" value="Cancel"></input></Link>
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
export default EditJob
