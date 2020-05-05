import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'
// import RightFixed from './RightFixed'
// import LeftFixed from './LeftFixed'

class CategoryList extends Component {
   state = {
      categories: [],
      cat_id:"",
      cat_name:"",
      delete:false
    };
    componentDidMount = async () => {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
      const res = await axios.get(` http://localhost:5000/api/v1/category`, config);
        this.setState({
        categories: res.data.data,
      });
        console.log(this.state.categories);
             
    };
    deleteProject = async (id,name, e) => {
      alert("You Want To Delete this Category?");
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const res = await axios.delete(`http://localhost:5000/api/v1/category/${id}`,config); 
          this.setState({
                delete:true,
              });
              window.location.reload();
             
  }
    render() {
        return (
         <Fragment>
         {/* {this.state.delete ?
         ( 
            
            )
         : 
         (  */}
          <div>
               <AdminNav/>
               <form method="post">
                   <div className="main-admin">
                         <div className="row"> 
                         {/* <div className="col-md-3"><LeftFixed /></div>  */}
                             <div className="col-md-11">
                          
                             <div className="card"> 
                           <Link to="/admin/add_category" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                           ....Add New Category</Link>
                            </div>
                            
                            <div className="card ">
                             {this.state.categories.map((cat) => (
                                 <div>
                                       <div className="row ml-2">
                                          <div className='col-md-10'>
                                            <h6 className='text-blue'>{cat.catname}</h6>
                                            </div>

                                          <div className="col-md-1">
                                          {/* <a onClick={(e) =>this.getcatId(cat._id, e)}> */}
                                            <h5><i className='fa fa-pencil'></i></h5>
                                            {/* </a>  */}
                                            </div>

                                            <div className="col-md-1">
                                          <a onClick={(e) =>this.deleteProject(cat._id, e)}>
                                            <h5><i className='fa fa-trash-o'></i></h5></a> 
                                            </div>

                                       </div><hr/>
                                       </div>
                            ))}
                            </div>
                             </div>
                        </div>
                    </div>
                </form>
            </div>
           {/* )} */}
                    </Fragment>  
        )
    }

}
export default CategoryList