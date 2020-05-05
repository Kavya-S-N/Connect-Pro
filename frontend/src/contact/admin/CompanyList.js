import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'
// import RightFixed from './RightFixed'
// import LeftFixed from './LeftFixed'

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
  //   getcompanyId = async (id,name, e) => {
  //     e.preventDefault();
  //     this.setState({
  //         company_id: id,
  //         company_name:name,
  //         view:true,
  //     });
  //     console.log(id)
  // }

  deleteCompany = async (id,user, e) => {
    alert("You Want To Delete this Company?");
    const token = sessionStorage.getItem("token");
    const config = {
      headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await axios.delete(`http://localhost:5000/api/v1/company/${id}`,config); 
        // const reslt=await axios.delete(`http://localhost:5000/api/v1/auth/${id}`,config)
        window.location.reload();
       } catch (error) {
        alert("something wrong");
       }
           
}
    render() {
        return (
        //  <Fragment>
        //  {this.state.view ?
        //  ( 
        //      (<Redirect view={this.state.view} 
        //        to={{pathname:'/student/company/job',
        //                state:{company_id:this.state.company_id,
        //                       company_name:this.state.company_name}
        //            }} 
        //        />) 
        //     )
        //  : 
        //  (
          <div>
               <AdminNav/>
               <form method="post">
                   <div className="main-admin">
                         <div className="row"> 
                         {/* <div className="col-md-3"><LeftFixed /></div>  */}
                             <div className="col-md-11">
                          
                             <div className="card"> 
                           <Link to="/admin/add_company" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                           ....Add New Company</Link>
                            </div>
                            
                             {this.state.companies.map((company) => (
                                <div className="card ">
                                
                                     <div className="row ml-2">
                                          <div className='col-md-10'>
                                            <h5 className='text-blue'>{company.name}</h5>
                                            <a className='text-muted ml-2' href={company.website}>{company.website}</a><br/>  
                                            <a className='text-muted ml-2'>Email : {company.email}</a><br/>  
                                             <a className='text-muted ml-2'>Contact : {company.phone}</a>  
                                          </div>
                                          
                                          <div className="col-md-1">
                                          {/* <a onClick={(e) =>this.getcatId(company._id,company.user, e)}> */}
                                            <h5><i className='fa fa-pencil'></i></h5>
                                            {/* </a>  */}
                                            </div>

                                            <div className="col-md-1">
                                          <a onClick={(e) =>this.deleteCompany(company._id,company.user,e)}>
                                            <h5><i className='fa fa-trash-o'></i></h5></a> 
                                            </div>

                                       </div>
                                </div>
                              ))}
                             </div>

	                      
                        </div>
                    </div>
                </form>
            </div>
        //    )}
        //  </Fragment>  
        )
    }

}
export default CompanyList