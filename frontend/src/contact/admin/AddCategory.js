import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'

class AddCategory extends Component {
  constructor(props) {
    super(props);
        this.state = {
            catname:"",
            user:"",
            me:"",
            success: false,
          };
          this.onChange = this.onChange.bind(this);
       }
       onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
     }
       
     onSubmit = async (e) => {
        e.preventDefault();
               
        const add = {
            catname:this.state.catname,
                       
         };
        const body = JSON.stringify(add);
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
       }
       console.log(token);
        try {
           const res = await axios.post(`http://localhost:5000/api/v1/category`,body,config);
               this.setState({success: true,});
           }catch (error) 
           {alert("Sorry Something Wrong!!");}
       }
        render() {
          
          return (
            <Fragment>
            { this.state.success ?
             ( <Redirect to="/admin/categorylist" />
             ):
             (

          <div>
               <AdminNav/>
               <form method="post" onSubmit={this.onSubmit}>
                   <div className="main-admin">
                         <div className="row"> 
                          
                             <div className="col-md-11">
                          
                                <div className="card ">
                                <h5 style={{fontWeight: 'bold'}} className='text-muted mb-4 ml-2'>Add New Category</h5>
                                  <input type="text"
                                   className="col-md-12" 
                                   placeholder="Category" 
                                   name="catname" 
                                   value={this.state.catname}
                                   onChange={this.onChange} 
                                   required></input>

                                   <input type="file"></input>

                                   <div className="row" style={{marginLeft:'22%'}}>
                                       <input type="submit" className="btn btn-blue mr-5" value="Add" name="submit"></input>
                                        <input type="reset" className="btn btn-dark  ml-5" value="Reset"></input>
                                    </div>
                                  
                                    </div>
                                 </div>
                             </div>
                        </div>
                </form>
            </div> 
             )};
             </Fragment>
        )
    }

}
export default AddCategory
