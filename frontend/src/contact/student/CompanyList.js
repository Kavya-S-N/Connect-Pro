import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class CompanyList extends Component {
   state = {
      companies: [],
      company_id:"",
      company_name:"",
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
      const res = await axios.get(` http://localhost:5000/api/v1/company`, config);
        this.setState({
        companies: res.data.data,
      });
        console.log(this.state.companies);
             
    };
    getcompanyId = async (id,name, e) => {
      e.preventDefault();
      this.setState({
          company_id: id,
          company_name:name,
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
               to={{pathname:'/student/company/job',
                       state:{company_id:this.state.company_id,
                              company_name:this.state.company_name}
                   }} 
               />) 
            )
         : 
         (
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                         <div className="row"> 
                         <div className="col-md-3"><LeftFixed /></div> 
                             <div className="col-md-9">
                          
                             {this.state.companies.map((company) => (
                                <div className="card ">
                                
                                     <div className="row ml-2">
                                          <div className='col-md-9'>
                                            <h5 className='text-blue'>{company.name}</h5>
                                            <a className='text-muted ml-2' href={company.website}>{company.website}</a><br/>  
                                            <a className='text-muted ml-2'>Email : {company.email}</a><br/>  
                                             <a className='text-muted ml-2'>Contact : {company.phone}</a>  
                                          </div>
                                          <div className="">
                                             <button className='btn btn-blue' 
                                              onClick={(e) =>
                                                this.getcompanyId(company.user,
                                                                  company.name, e)
                                               }>View Jobs</button><br/>
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
export default CompanyList