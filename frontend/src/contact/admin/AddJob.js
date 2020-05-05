import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'


class AddJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"",
            category:"",
            description:"",
            CTC:"",
            skils:"",
            qualification:"",
            user:"",
            me:"",
            categories:[],
            success: false,
          };
         this.onChange = this.onChange.bind(this);
         this.handleDropdownChange = this.handleDropdownChange.bind(this);
      }
      handleDropdownChange(e) {
        this.setState({ category: e.target.value });
        console.log(this.state.category)
      }
      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
     }
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
      console.log(this.state.categories)      
     };
    
     onSubmit = async (e) => {
        e.preventDefault();
               
        const add = {
            title:this.state.title,
            category:this.state.category,
            description:this.state.description,
            CTC:this.state.CTC,
            skils:this.state.skils,
            qualification:this.state.qualification,
            
         };
        const body = JSON.stringify(add);
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          
       }
       
        try {
               const res = await axios.post(
                                            `http://localhost:5000/api/v1/jobs`,
                                             body,
                                             config
                                            );
                 this.setState({
                             success: true,
                           });
                           console.log(res);
           }catch (error) {
                           alert("Sorry Something Wrong!!");
                          }
                          
      }
        render() {
          
          return (
            <Fragment>
            { this.state.success ?
             ( <Redirect to="/company/jobs" />
             ):
             (
          <div>
               <AdminNav/>
               <form method="post" onSubmit={this.onSubmit}>
                   <div className="main-admin">
                         <div className="row"> 
                        
                             <div className="col-md-11">
                              <div className="card ">
                                <h5 style={{fontWeight: 'bold'}} className='text-muted mb-4 ml-2'>Post New Job</h5>
                                   <input type="text" 
                                   className="col-md-12" 
                                   name="title" 
                                   value={this.state.title}
                                   onChange={this.onChange} 
                                   placeholder="Job Title" 
                                   required></input>
                                  
                                  <textarea 
                                  placeholder="Description"
                                  name="description" 
                                   value={this.state.description}
                                   onChange={this.onChange} >
                                  </textarea><br/>
                                  
                                  
                                  <div className="form-row frow">
                                  <h6 className="ml-2 text-muted">Select Category:</h6>
                                   <select id="dropdown" className="ml-2 mr-2" onChange={this.handleDropdownChange} required>
                                   <option value="no cat"></option>
                                      {this.state.categories.map((cat) => ( 
                                      <option className="ml-2 text-muted" value={cat._id} name="category">
                                      {cat.catname}
                                      </option> ))} 
                                      </select>
                                    </div>
                                 
                                  <textarea 
                                  placeholder="Skils Required"
                                  name="skils" 
                                   value={this.state.skils}
                                   onChange={this.onChange}  
                                  className="mt-3"></textarea>
                                  
                                  <textarea 
                                  placeholder="Qualification Required"
                                  name="qualification" 
                                   value={this.state.qualification}
                                   onChange={this.onChange}  
                                  className="mt-3"></textarea>
                                  
                                  <input 
                                  type="text" 
                                  className="col-md-12" 
                                  placeholder="CTC" 
                                  name="CTC" 
                                   value={this.state.CTC}
                                   onChange={this.onChange} 
                                  required></input>
                                  
                                  <div className="row mx-auto" style={{marginLeft:'22%'}}>
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
export default AddJob
