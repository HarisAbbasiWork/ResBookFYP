import React, {useState,useEffect} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faLocationArrow, faTag, faMapMarkerAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Button,Jumbotron } from 'react-bootstrap';
import {  MDBRow,  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput} from "mdbreact";
function Review({email2, userID}) {
    let params = useParams();
    let history = useHistory();
    const [item, setItem] = useState(null)
    const [test, setTest] = useState(null)
    const [writingcomment, setWritingcomment]=useState([])
    const onChange=(e, id) =>{
        console.log(e.target.value," and postid ", id)
        const comment={
          postid: id,
          comment: e.target.value
        }
        var updates=writingcomment
        const objIndex = updates.findIndex((obj => obj.postid == id));
        if(objIndex<0){
          const comment={
            postid: id,
            comment: e.target.value
          }
          updates=[...writingcomment,comment]

        }else{
          //Log object to Console.
          console.log("Before update: ", updates[objIndex], "also index",objIndex)
          //Update object's name property.
          updates[objIndex].comment = e.target.value
          //Log object to console again.
          console.log("After update: ", updates[objIndex])

        }
        
        setWritingcomment(updates)
      }
      const postComment=(id)=>{
        var updates=writingcomment
        const objIndex = updates.findIndex((obj => obj.postid == id));
        if(objIndex<0){
          alert("You posting empty comment")

        }else{
          //Log object to Console.
          console.log("Before update: ", updates[objIndex], "also index",objIndex)
          //Update object's name property.
          console.log("comment: ",updates[objIndex].comment)
          axios.post('/addcomment', {
            postid: id,
            userid: userID,
            comment: updates[objIndex].comment
          })
          .then(function (response) {
            console.log(response.data)
            history.push('/review/'+response.data.postid);
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });

        }
        
        
  
    }
    const getReview=(id)=>{
        axios.get('http://localhost:5000/review/'+id,{
          headers:{
              "x-access-token":localStorage.getItem("token")
          }
      })
            .then(response => {
                console.log("Opened Review Info: ",response.data)
                setItem(response.data)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const isinlikedby=(likes)=>{
  
        if(likes){
          console.log(likes.includes(email2))
          return likes.includes(email2)
        }else{
          return false
        }
        
      
        
        
      }
    const isindislikedby=(dislikes)=>{
        
        if(dislikes){
          console.log(dislikes.includes(email2))
          return dislikes.includes(email2)
        }else{
          return false
        }
        
      
        
        
      }
      const handleDelete=(id)=>{
        axios.post('/deletereview', {
            id: id
          })
          .then(function (response) {
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
  
    }
    const handleLikes=(id)=>{
        axios.post('/increaselikes', {
          postid: id,
          likedby: email2
          })
          .then(function (response) {
            console.log("Like response: ", response.data)
            setTest(test+1)
              
          })
          .catch(function (error) {
            console.log('Error is ',error);
          });
    
    }
    const handleDislikes=(id)=>{
      axios.post('/increasedislikes', {
        postid: id,
        dislikedby: email2
        })
        .then(function (response) {
          console.log("Dislike response: ", response.data)
          setTest(test+1)
            
        })
        .catch(function (error) {
          console.log('Error is ',error);
        });
    
    }
    useEffect(() => {
        console.log("We opening profile"+ params.reviewid+"Logged user email: "+email2)
        getReview(params.reviewid)
        
    }, [params, test])
    if(item){
    return (
        <div>
            <Jumbotron style={ { height:'100%',
                Width: '100%',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',
                //backgroundColor:"transparent",
                marginTop:"0px"}} >
            <div style={{marginLeft: '35%', marginRight: '35%'}} key={item.id}><MDBRow>
      <MDBCol>
        <MDBCard news className="my-5">
          <MDBCardBody>
            <div className="content" >
            <img
                src={item.userid.propic}
                alt=""
                height={40}
                className="rounded-circle avatar-img z-depth-1-half"
              />
              <a href={'/profile/'+item.userid._id}>{item.userid.firstname+' '+item.userid.lastname}</a>{item.userid.email===email2?<button style={{float:"right"}} onClick={()=>handleDelete(item._id)}><FontAwesomeIcon icon={faTrashAlt}  color="red" /></button>:null}
              <div className="left-side-meta">{item.date}</div>
              
            </div>
          </MDBCardBody>
          
          <MDBCardBody>
            <div className="social-meta">
              <a>Restaurant: </a><a href={'/restaurant/'+item.placeid}>{item.resname}</a>
              <p>Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.rate}/10 </p>
              <p>Tag: <FontAwesomeIcon icon={faTag} color="blue" /> {item.tag}</p>
              <p>{item.review}</p>
              <span>
              {isindislikedby(item.dislikedBy)?null:<Button variant="primary" size="sm" onClick={()=>handleLikes(item._id)} style={{marginRight:"50%"}} active >{item.likes} {isinlikedby(item.likedBy)?"Upvoted":"Upvote"} 
              </Button>}
              {isinlikedby(item.likedBy)?null:<Button variant="primary" size="sm" onClick={()=>handleDislikes(item._id)} active >{item.dislikes} {isindislikedby(item.dislikedBy)?"Downvoted":"Downvote"}
              </Button>}
                
              </span>
              
            </div>
            {item.comments.map(comment=>(
                <div style={{backgroundColor:'#f2f4f6', marginTop:'1%'}}>
                  <img
                  src={comment.user.propic}
                  alt=""
                  height={40}
                  
                  className="rounded-circle avatar-img z-depth-1-half"
                  />
                  <a href={'/profile/'+comment.user._id}>{comment.user.firstname+' '+comment.user.lastname}</a>
                  
                  <a>{': '+comment.text}</a>
                </div>
                
              
            ))}
            <hr />
            <MDBInput far icon="heart" hint="Add Reply..." onChange={e => onChange(e,item._id)} />
            <Button variant="primary" size="sm" onClick={()=>postComment(item._id)} style={{marginLeft:"85%"}} active> Reply
              </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
            </MDBRow></div>
            </Jumbotron>
        </div>
    )
}else{
    return (
        <div>
            <h1>Review Loading...</h1>
        </div>
    )
}
}

export default Review
