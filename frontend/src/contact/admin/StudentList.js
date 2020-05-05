import React, { Component,useState, Fragment } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import axios from "axios";
import {Redirect,Link} from 'react-router-dom'
import avatar from '../assets/avatar.jpg'
import AdminNav from './AdminNav'
// import RightFixed from './RightFixed'
// import LeftFixed from './LeftFixed'

class StudentList extends Component {
   state = {
      students: [],
      student_id:"",
      student_name:"",
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
      const res = await axios.get(` http://localhost:5000/api/v1/students`, config);
        this.setState({
        students: res.data.data,
      });
        console.log(this.state.students);
             
    };
    deleteStudent = async (id,user, e) => {
      alert("You Want To Delete this Student?");
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        try {
          const res = await axios.delete(`http://localhost:5000/api/v1/students/${id}`,config); 
          // const reslt=await axios.delete(`http://localhost:5000/api/v1/user/${user}`,config)
          window.location.reload();
         } catch (error) {
          alert("something wrong");
         }
             
  }

    getstudentId = async (id,name, e) => {
      e.preventDefault();
      this.setState({
          student_id: id,
          student_name:name,
          view:true,
      });
      console.log(id)
  }
    render() {
        return (
         <Fragment>
       
          <div>
               <AdminNav/>
               <form method="post">
                   <div className="main-admin">
                         <div className="row"> 

                          <div className="col-md-11">

                          <div className="card"> 
                           <Link to="/admin/add_student" style={{color:'black'}}><i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
                           ....Add New Student</Link>
                            </div>
                          
                            <div className="card ">
                             {this.state.students.map((student) => (
                                
                                <div>
                                     <div className="row ml-2">
                                          <div className='col-md-10'>
                                            <h5 className='text-blue'>{student.name}</h5>
                                            <a className='text-muted ml-2'>{student.department}</a><br/>  
                                            <a className='text-muted ml-2'>Email : {student.email}</a><br/>  
                                             <a className='text-muted ml-2'>Contact : {student.phone}</a>  
                                          </div>
                                          

                                          <div className="col-md-1">
                                          {/* <a onClick={(e) =>this.getcatId(student._id,student.user, e)}> */}
                                            <h5><i className='fa fa-pencil'></i></h5>
                                            {/* </a>  */}
                                            </div>

                                            <div className="col-md-1">
                                          <a onClick={(e) =>this.deleteStudent(student._id,student.user,e)}>
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
      </Fragment>
        )
    }

}
export default StudentList