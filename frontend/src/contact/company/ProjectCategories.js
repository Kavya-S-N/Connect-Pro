import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import CompanyNav from './CompanyNav'
import LeftFixed from './LeftFixed'
import cs from '../assets/cs.jpg'
import elec from '../assets/elec.jpg'
import bio from '../assets/bio.jpg'
import mech from '../assets/mech.jpg'

class ProjectCategories extends Component {
    state = {
      categories: [],
      category_id:"",
      catname:"",
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
       
      const res = await axios.get(`http://localhost:5000/api/v1/category`, config);   
      this.setState({
          categories: res.data.data,
      });        
      
             
    };
    getCatId = async (id,catname, e) => {
       e.preventDefault();
       this.setState({
           category_id: id,
           catname:catname,
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
             to={{pathname:'/company/projects',
                     state:{category_id:this.state.category_id,
                            catname:this.state.catname}
                 }} 
             />) 
          )
       : 
       (
  
          <div>
               <CompanyNav/>
               <form method="post">
                   <div className="container">
                                      
                        <div className="row">
                        <div className="col-md-3" > 
                            <LeftFixed/>
                          </div>
                            
                            <div className="col-md-9">
                                <div className="row ml-4">
                               
                                {this.state.categories.map((cat) => (  
                                   <a className="card col-md-5 ml-4"  
                                    onClick={(e) =>this.getCatId(cat._id, cat.catname,e)}>
                                      <img src={cs} alt="cs" style={{width:'300px'}}/>
                                     <h5 className='text-blue mb-3 mx-auto'>{cat.catname}</h5>
                                    </a>
                                     ))}   
                                                                     
                                </div>

                             </div>
                        </div>
                    </div>
                </form>
            </div> 
             )}
         </Fragment> 
        )
    }

}
export default ProjectCategories
