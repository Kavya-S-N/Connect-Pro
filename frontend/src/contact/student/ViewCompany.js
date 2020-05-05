import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import StudentNav from './StudentNav'
import RightFixed from './RightFixed'
import LeftFixed from './LeftFixed'

class ViewCompany extends Component {
    constructor(props) {
        super(props);
  
        this.state={
        company_id:this.props.location.state.company_id,
        company:{},
        me:""
    }
    console.log(`company_id :${this.state.company_id}`)
    console.log(`company_name :${this.state.company_name}`)
    }
    componentDidMount = async () => {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
          const res = await axios.get(`http://localhost:5000/api/v1/company/${this.state.company_id}`,config); 
              this.setState({
                  company: res.data.data,
                  });
       
         //  console.log(this.state.projects);
          console.log(this.state.company);
               
      };
      onClick = async (e) => {
        e.preventDefault();
        this.setState({
              view:true,
        });
    }
    render() {
        const{
            name,
            slug,
            description,
            website,
            phone,
            email,
            address
        }=this.state.company
        return (
            <Fragment>
            {this.state.view ?
            ( 
                (<Redirect view={this.state.view} 
                  to={{pathname:'/student/company/job',
                          state:{company_id:this.state.company_id,
                                 company_name:name}
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
                          
                                <div className="card ">
                                     <h4 style={{fontWeight: 'bold'}} className='text-muted ml-3 mb-3'>{name}</h4>
                                      <div className="row ml-2">
                                          <div className='col-md-9'>
                                             <a className='text-muted' href={website}>{website}</a><br/>
                                             <p className='text-muted'>contact : {phone}</p>    
                                          </div>
                                          <div className="">
                                             <button className='btn btn-blue' 
                                             onClick={this.onClick}>View Jobs</button><br/>
                                          </div>
                                       </div><hr/>

                                       
                                        <div className="row ml-3"><h6 className='text-muted'>Description</h6></div>
                                        <div className="row ml-3">{description}</div><hr/> 

                                        <div className="row ml-3"><h6 className='text-muted'>Description</h6></div>
                                        <div className="row ml-3">{description}</div><hr/> 

                                        <div className="row ml-3"><h6 className='text-muted'>Description</h6></div>
                                        <div className="row ml-3">{description}</div><hr/> 

                                        <div className="row ml-3"><h6 className='text-muted'>Description</h6></div>
                                        <div className="row ml-3">{description}</div><hr/> 
                                              

                                 </div>
                          
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
export default ViewCompany
