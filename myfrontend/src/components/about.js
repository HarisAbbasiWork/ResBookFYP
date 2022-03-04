import React from 'react'
import { Button,Jumbotron } from 'react-bootstrap';
function About({name, dob,email}) {
    return (
        <div>
            <div style={{ backgroundColor: '#990505', marginTop:'0.5%' }}><h3 style={{color: 'white', paddingLeft:'40%' }}>{name} About </h3></div>
            <div style={{backgroundColor: '#990505' }}>
                <h1 style={{color:'white'}}>Email: {email}</h1>
                <br/><span style={{color:'white'}}>Date Of Birth: {dob} 
                 
                </span>
            </div>
            
            
        </div>
    )
}

export default About
