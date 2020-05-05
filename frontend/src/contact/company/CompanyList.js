import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import avatar from '../assets/avatar.jpg'
import CompanyNav from './CompanyNav'

class CompanyList extends Component {
    render() {
        return (
            <div>
               <CompanyNav/>
               <form method="post">
                  <div className="container"> 
                     <div className="row"> 
                         <div className="col-md-3">
                         
                            <div className="card profile">
                                <Link to="/" > 
                                <img src={avatar} alt="avatar" class="card_avatar"></img></Link><hr/>
                                <h5 className="bold">Name</h5>
                                <p className='text-muted'>abc@gmail.com<br/>
                                 Department<br/>
                                 College Name with address</p>
                            </div>
                          

                            <div className="card ">
                                <p style={{fontWeight: 'bold'}} className='text-muted'>Jobs</p>
                                <div className='project-list'>
                                  <Link to="/" style={{color:'black'}}><p>xcghjk</p></Link><hr/>
                                  <Link to="/" style={{color:'black'}}><p>xcghjk</p></Link><hr/>
                                </div>
                            </div>
                          
                         </div>

                        <div className="col-md-6">
                            <div className="card"> 
                               <Link to="/" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                               ....Add New Project</Link>
                            </div>
                      
                            <div class="card">
                               <div class="card-header row">
                                  <h5 className="bold col-md-10">Project Title</h5>
                                  <Link to="/" style={{color:'blue'}}>View</Link>
                               </div>
                
                               <div class="card-body">
                                  <p>Company Name</p>
                                  <p className='text-muted'>CTC</p>
                               </div> 
                            </div>
                         </div>

                         <div className="col-md-3">
                            <div className="card"> 
                               <p style={{fontWeight: 'bold'}} className='text-muted'>Companies</p>
                               <div className='project-list'>
                                    <Link to="/" style={{color:'black'}}><p>xcghjk</p></Link><hr/>
                                    <Link to="/" style={{color:'black'}}><p>xcghjk</p></Link><hr/>
                               </div>
                            </div>
                         </div>
                    </div>
                 </div>
              </form>
          </div>
   
        )
    }

}
export default CompanyList
