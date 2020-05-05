import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import dev from '../assets/2-Web-Development-Banner-1.png'
import HomeNav from './HomeNav'
const Home =()=>
{
   return(
   
     <div>
       <HomeNav/>
         <div>
            <div className="container-fluid">
               <div className="row"> 
                  <div className="col-md-6">
                     <br/><img  src={dev} style={{width:'85%'}}></img> 
                  </div>
                
                <div className="col-md-6">
                  <br/><br/><br/><br/>
                  <h1 className="display-4" style={{ textShadow: "2px 2px 2px black",color:"rgb(34, 9, 92)"}}>Convert your Project<br/><br/>Into Product</h1>
                </div>  

               </div>
             </div>
           </div>
        </div>
    )
    }
     
    export default Home
