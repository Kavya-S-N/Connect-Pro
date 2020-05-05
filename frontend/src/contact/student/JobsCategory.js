import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import StudentNav from './StudentNav'
import Fixed from './RightFixed'
import LeftFixed from './LeftFixed'
import cs from '../assets/cs.jpg'
import elec from '../assets/elec.jpg'
import bio from '../assets/bio.jpg'
import mech from '../assets/mech.jpg'

class ProjectCategories extends Component {
    render() {
        return (
          <div>
               <StudentNav/>
               <form method="post">
                   <div className="container">
                                      
                        <div className="row">
                        <div className="col-md-3"><LeftFixed /></div> 
                            <div className="col-md-9">
                                <div className="row ml-4">
                                   <Link to="/student/category/jobs" className="card col-md-5 ml-4">
                                   <img src={cs} alt="cs" style={{width:'100%'}}/>
                                            <h5 className='text-blue mb-3 mx-auto'>Computer Science</h5>
                                    </Link> 
                                    <Link to="/student/category/jobs" className="card col-md-5 ml-4">
                                   <img src={elec} alt="elec" style={{width:'100%'}}/>
                                            <h5 className='text-blue mb-3 mx-auto'>Electronic engineering</h5>
                                    </Link>
                                   
                                </div>

                                <div className="row ml-4">
                                    <Link to="/student/category/jobs" className="card col-md-5 ml-4">
                                        <img src={bio} alt="bio" style={{width:'100%'}}/>
                                         <h5 className='text-blue mb-3 mx-auto'>Biomedical engineering</h5>
                                    </Link> 
                                    <Link to="/student/category/jobs" className="card col-md-5 ml-4">
                                         <img src={mech} alt="mech" style={{width:'100%'}}/>
                                         <h5 className='text-blue mb-3 mx-auto'>mechanical engineering</h5>
                                    </Link> 
                                </div>

                             </div>
                        </div>
                    </div>
                </form>
            </div> 
        )
    }

}
export default ProjectCategories
