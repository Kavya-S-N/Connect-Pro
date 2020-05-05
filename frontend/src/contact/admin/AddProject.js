import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'


class AddProject extends Component {
  constructor(props) {
    super(props);
        this.state = {
            title:"",
            description:"",
            technology:"",
            synopsis:"",
            category:"",
            developers:"",
            duration:"",
            guide:"",
            institution:"",
            contact:"",
            email:"",
            price:"",
            user:"",
            me:"",
            categories:[],
            success: false,
          };
          this.onChange = this.onChange.bind(this);
          this.handleDropdownChange = this.handleDropdownChange.bind(this);
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
     
      onChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
     }
     handleDropdownChange(e) {
      this.setState({ category: e.target.value });
      console.log(this.state.category)
    }
  //   handleDropdownChange = async(id)=> {
  //     this.setState({ category:id});
  //     console.log(this.state.category)
  // }
    
     onSubmit = async (e) => {
        e.preventDefault();
               
        const add = {
            title:this.state.title,
            description:this.state.description,
            technology:this.state.technology,
            synopsis:this.state.synopsis,
            category:this.state.category,
            developers:this.state.developers,
            duration:this.state.duration,
            guide:this.state.guide,
            institution:this.state.institution,
            contact:this.state.contact,
            email:this.state.email,
            price:this.state.price,
            
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
               const res = await axios.post(
                                            `http://localhost:5000/api/v1/projects`,
                                             body,
                                             config
                                            );
              
              this.setState({
                             success: true,
                           });
           }catch (error) {
                           alert("Sorry Something Wrong!!");
                          }
      }
        render() {
          
          return (
            <Fragment>
            { this.state.success ?
             ( <Redirect to="/admin/projectlist" />
             ):
             (

          <div>
              <AdminNav/>
               <form method="post" onSubmit={this.onSubmit}>
                   <div className="main-admin">
                         <div className="row"> 
                        
                             <div className="col-md-11">
                          
                                <div className="card ">
                                <h5 style={{fontWeight: 'bold'}} className='text-muted mb-4 ml-2'>Add New Projects</h5>
                                  <input type="text"
                                   className="col-md-12" 
                                   placeholder="Project Title" 
                                   name="title" 
                                   value={this.state.title}
                                   onChange={this.onChange} 
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
                                  placeholder="Technology Used" 
                                  className="mt-3"
                                  name="technology" 
                                  value={this.state.technology}
                                  onChange={this.onChange} 
                                  required>
                                  </textarea>
                                 
                                  <textarea 
                                  placeholder="Project Synopsis" 
                                  className="mt-3"
                                  name="synopsis" 
                                  value={this.state.synopsis}
                                  onChange={this.onChange} 
                                  required></textarea>
                                 
                                  <textarea 
                                  placeholder="Developers" 
                                  className="mt-3"
                                  name="developers" 
                                  value={this.state.developers}
                                  onChange={this.onChange} 
                                  required></textarea>                         
                                  
                                  <input 
                                  type="text" 
                                  className="col-md-12" 
                                  placeholder="Time Duration" 
                                  name="duration" 
                                  value={this.state.duration}
                                  onChange={this.onChange} 
                                  required></input>
                                  
                                    
                                   <div className="row">
                                      <input type="text" 
                                      className="col-md-5 ml-3" 
                                      placeholder="Guides" 
                                      name="guide" 
                                      value={this.state.guide}
                                      onChange={this.onChange} 
                                      required></input>
                                      
                                      <input 
                                      type="text" 
                                      className="col-md-6 ml-4" 
                                      placeholder="Institution" 
                                      name="institution" 
                                      value={this.state.institution}
                                      onChange={this.onChange} 
                                      required></input> 
                                   </div><hr/>
                                  
                                   <input 
                                   type="text" 
                                   className="col-md-12" 
                                   placeholder="Contact Number" 
                                   name="contact" 
                                   value={this.state.contact}
                                   onChange={this.onChange} 
                                   required></input>
                                   
                                   <input 
                                   type="text" 
                                   className="col-md-12" 
                                   placeholder="Email" 
                                   name="email" 
                                   value={this.state.email}
                                   onChange={this.onChange} 
                                   required></input>  
                                   
                                   <input 
                                   type="text" 
                                   className="col-md-12" 
                                   placeholder="Price /-" 
                                   name="price" 
                                   value={this.state.price}
                                   onChange={this.onChange} 
                                   required></input>     



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
export default AddProject
