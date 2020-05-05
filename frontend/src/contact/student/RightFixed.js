import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'


class RightFixed extends Component {
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
            <div style={{position: 'fixed',width:'18%', height: '400px', overflow: 'auto'}} >
                     <div className="card"> 
                          <p style={{fontWeight: 'bold'}} className='text-muted'>View Jobs of company</p>
                          <div className='project-list'>
                          {this.state.companies.map((company) => (
                               <a onClick={(e) =>
                                this.getcompanyId(company.user,
                                                  company.name, e)
                                }><p>{company.name}</p></a>
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
