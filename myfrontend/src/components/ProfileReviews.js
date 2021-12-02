import React, {useState,useEffect} from 'react'
import {  MDBRow,  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput} from "mdbreact";
import Button from 'react-bootstrap/Button'
import {useParams,withRouter, useHistory} from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTag } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
function ProfileReviews({id,name}) {
    const [items, setItems]=useState([])
    let history = useHistory();
     const getReviews=async()=>{
        await axios.get('http://localhost:5000/getreviews')
        .then(response => {
            console.log(response.data)
            setItems(response.data.filter(item=>item.userid == id))
            console.log("Application got profile reviews bro")
        })
        .catch(function (error){
            console.log(error);
            console.log("Aey te error hai bro")
        })
    }
    useEffect(() => {
    
        getReviews()
        
    }, [])
    return (
        <div>
            <h3 style={{borderLeft: '6px solid #4d0000', backgroundColor:'#990505', color: 'black' }}>View {name} Recent Reviews </h3>
            <Jumbotron style={{height:'100%',
                Width: '100vw',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',}}>
                {items.map(item=>(<div style={{marginLeft: '450px', marginRight: '450px'}} key={item._id}><MDBRow>
      <MDBCol>
        <MDBCard news className="my-5">
        <MDBCardBody>
            <div className="content">
            <img
                src={item.userpropic}
                alt=""
                height={40}
                className="rounded-circle avatar-img z-depth-1-half"
              />
              <a href='#' onClick={()=>{history.push('/profile/'+item.userid);}}>{item.user}</a>
              <div className="left-side-meta">{item.date}</div>
              
            </div>
          </MDBCardBody>
          
          <MDBCardBody>
            <div className="social-meta">
              <a>Restaurant: </a><a href="#" onClick={()=>{history.push('/restaurant/'+item.placeid);}}>{item.resname}</a>
              <p>Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.rate}/10 </p>
              <p>Tag: <FontAwesomeIcon icon={faTag} color="blue" /> {item.tag}</p>
              <p>{item.review}</p>
              <span>
              <Button variant="primary" size="sm" style={{marginRight:"170px"}} active>{item.likes} Upvote
              </Button>
              <Button variant="primary" size="sm" active>{item.likes} Downvote
              </Button>
              </span>
              
            </div>
            <hr />
            <MDBInput far icon="heart" hint="Add Comment..."  />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow></div>))}
            
    </Jumbotron>
            
        </div>
    )
}

export default ProfileReviews
