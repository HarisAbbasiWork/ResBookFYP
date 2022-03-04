import React, {useState,useEffect} from 'react'
import {useParams,withRouter, useHistory} from "react-router-dom";
import axios from 'axios'
import ShowFriends from './ShowFriends'
import ProfileReviews from './ProfileReviews'
import './comsCSS.css'
import './loginn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrashAlt, faGrinAlt, faSmile, faAngry } from '@fortawesome/free-solid-svg-icons'
import { Button,Jumbotron } from 'react-bootstrap';
import {  MDBRow,  MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput} from "mdbreact";
import About from './about'
import Font, { Text } from 'react-font'
import ProfileFavorites from './ProfileFavorites'
function Profile({email2, userID}) {
    let history = useHistory();
    let params = useParams();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [id, setID] = useState("")
    const [dob, setDob] = useState("")
    const [selectedSentiment, setSelectedSentiment] = useState("")
    const [friends, setFriends] = useState([])
    const [showWhich, setShowWhich] = useState("posts")
    const [isloaded, setIsloaded] = useState(false)
    const [propic, setPropic] = useState(null)
    const [test, setTest] = useState(0)
    const [writingcomment, setWritingcomment]=useState([])
    const [profilestatus, setProfilestatus] = useState("Not Anything")
    const [items, setItems]=useState([])
    const [backupitems, setBackupitems]=useState([])
    const getReviews=async()=>{
        await axios.get('http://localhost:5000/getpreviews/'+params.id)
        .then(response => {
            console.log(response.data)
            setItems(response.data)
            setBackupitems(response.data)
            setIsloaded(true)
            console.log("Application got profile reviews bro")
        })
        .catch(function (error){
            console.log(error);
            console.log("Aey te error hai bro")
        })
    }
    const getProfile=(id)=>{
        axios.get('http://localhost:5000/user/'+id)
            .then(response => {
                console.log("Opened Profile Info: ",response.data)
                setName(response.data.firstname+' '+response.data.lastname)
                setEmail(response.data.email)
                setDob(response.data.DOB)
                
                if(email2==="Login"){
                    setProfilestatus('')

                }else{
                    getLUFL(response.data.email)
                }
                
                setFriends(response.data.friends)
                setPropic(response.data.propic)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    const getLUFL=(emaill)=>{
        axios.get('http://localhost:5000/changeaccountsetting/'+email2)
            .then(response => {
                console.log("Logged User Info: ",response.data)
                console.log("Checking if "+emaill+" is in LU array")
                if (emaill===response.data.email){
                    setProfilestatus("My Profile")
                    console.log("Profile status is:My Profile")
                }
                if (response.data.friends.includes(emaill)){
                    console.log("Friend")
                    setProfilestatus("Friend")
                    console.log("Profile status is:Friend")

                }
                if (response.data.recievedRequests.includes(emaill)){
                    console.log("Recieved Friend")
                    setProfilestatus("Recieved Friend")

                }
                if (response.data.sentRequests.includes(emaill)){
                    console.log("Sent Friend")
                    setProfilestatus("Sent Friend")
                }
                
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })

    }
    useEffect(() => {
        console.log("We opening profile"+ params.id+"Logged user email: "+email2)
        var ret = params.id.replace('profile','');
        console.log(ret);
        setID(ret)
        getProfile(ret)
        setShowWhich("posts")
        getReviews()
        
    }, [params,test])
    const showFR=(string)=>{
        setShowWhich(string)
    }
    const SetSentimentsl=(string)=>{
      console.log(string)
      if(selectedSentiment==string){
        setSelectedSentiment("")
        setItems(backupitems)
      }else{
        setSelectedSentiment(string)
        setItems(backupitems.filter(review=>review.sentiment == string))

      }
      
  }
    const handleClick=()=>{
        console.log("Lets do work "+profilestatus)
        
        
        
        const URL = "http://localhost:5000/handlefriendbutton";
        var data2 ={
            Pemail: email,
            LUemail2: email2,
            profilestatus: profilestatus
            
        }
        const options = {
            method: 'post',
            url: URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            data: data2,

            validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
              
          }}
        
        axios(options).then(response => {
          console.log("change test value")
          setTest(test+1)
            console.log("Entered CONNN")
            if(profilestatus==="Friend"){
                setProfilestatus("Not Anything")
            }
            if(profilestatus==="Sent Friend"){
                setProfilestatus("Not Anything")
            }
            
          
        })
        
        
        .catch(error => {
            
            console.log("Error is: ",error.response)
        });
        

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
        setItems(items.filter(review=>review._id !== id))
  
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
    const isinlikedby=(likes)=>{
  
        if(likes){
          console.log(likes.includes(email2))
          return likes.includes(email2)
        }else{
          return false
        }
        
      
        
        
      }
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
      const isindislikedby=(dislikes)=>{
        
        if(dislikes){
          console.log(dislikes.includes(email2))
          return dislikes.includes(email2)
        }else{
          return false
        }
        
      
        
        
      }
    const center = {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%'
    } 
    if(!isloaded){
      return(
        <div style={{borderLeft: '6px solid #4d0000', display:'inline-block', backgroundColor: '#990505', width:'100%', marginTop:'0%' }}>
          <h1 style={{color:'white'}}>Profile Loading...</h1>
        </div>
      )

    }else{

    
    return (
        <div style={{alignItems: 'center',justifyContent: 'center', marginTop:'1%' }} >
            <div id="profileimgdiv" style={{textAlign: 'center'}}><img width="100" height="100" id="profileimgstyle" src={propic}></img></div>
            <h1 style={{textAlign:'center'}}>{name}</h1>
            
            {email2==="Login"||profilestatus==="My Profile"?null
            :profilestatus==="Not Anything"?
            <div id="ccc" onClick={handleClick}><div id="confirm">Add Friend</div></div>
            :profilestatus==="Recieved Friend"?
            <div id="ccc" onClick={handleClick}><div id="confirm2">Accept Friend Request</div></div>
            :profilestatus==="Sent Friend"?
            <div id="ccc" onClick={handleClick}><div id="confirm2">Cancel Friend Request</div></div>
            :profilestatus==="Friend"?
            <div id="ccc" onClick={handleClick}><div id="confirm">Unfriend</div></div>
            :null}
            
            
            <div style={{borderLeft: '6px solid #4d0000', display:'inline-block', backgroundColor: '#990505', color:'#990505', width:'100%', marginBottom:'0%'  }}>
            <Button onClick={()=>showFR("friends")} style={{display:'inline-block',marginLeft:'6%', height: '34px',backgroundColor:'white', borderRadius:'20px', color:'black',fontWeight:'bold' }}>View {name} Friends ({friends.length}) </Button>
            <Button onClick={()=>showFR("posts")} style={{backgroundColor:'white', borderRadius:'20px', color:'black',display:'inline-block',marginLeft:'11%', height: '34px', fontWeight:'bold'}}>View {name} Reviews </Button>
            <Button onClick={()=>showFR("about")} style={{backgroundColor:'white', borderRadius:'20px', color:'black',display:'inline-block',marginLeft:'11%', height: '34px',fontWeight:'bold'}}>View {name} About </Button>
            <Button onClick={()=>showFR("favorites")} style={{backgroundColor:'white', borderRadius:'20px', color:'black',display:'inline-block',marginLeft:'12%', height: '34px',fontWeight:'bold'}}>View Haris Abbasi Favorites</Button>
            </div>
            <div style={{  
                height:'100vh',
                Width: '100vw',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',
                //backgroundColor:"transparent",
                marginTop:"0px",
              }}>
            {showWhich==="friends"
            ?<div>{friends.map(friend=>(
            <ShowFriends fremail={friend}/>
            ))}</div>
            :null}
            {showWhich==="posts"
            ?(
                <div style={{marginTop:'1%'}}>
                    <h3 style={{borderLeft: '6px solid #4d0000', backgroundColor: '#990505', color: 'white' ,marginBottom:"0px"  }}>View {name} Recent Reviews </h3>
                    <Jumbotron style={{height:'100%',
                Width: '100vw',
               backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',}}>
                  
                  <Button onClick={()=>SetSentimentsl("Positive")} size="lg" style={{marginLeft:'20%',borderRadius:'22px',height: '15%', backgroundColor:selectedSentiment=="Positive"?"#260033":'#990505'}}><FontAwesomeIcon icon={faGrinAlt}  color="white" /> Positive</Button>
                  <Button onClick={()=>SetSentimentsl("Neutral")} size="lg" style={{marginLeft:'20%',borderRadius:'22px',height: '15%', backgroundColor:selectedSentiment=="Neutral"?"#260033":'#990505'}}><FontAwesomeIcon icon={faSmile}  color="white" /> Neutral</Button>
                  <Button onClick={()=>SetSentimentsl("Negative")} size="lg" style={{marginLeft:'20%',borderRadius:'22px',height: '15%', backgroundColor:selectedSentiment=="Negative"?"#260033":'#990505'}}><FontAwesomeIcon icon={faAngry}  color="white" /> Negative</Button>
                        {items.map(item=>(<div style={{marginLeft: '35%', marginRight: '35%'}} key={item._id}><MDBRow>
              <MDBCol>
                <MDBCard news className="my-5">
                  <MDBCardBody>
                    <div className="content">
                    <img
                        src={propic}
                        alt=""
                        height={40}
                        className="rounded-circle avatar-img z-depth-1-half"
                      />
                      <a style={{marginLeft:'2%'}} href={'/profile/'+item.userid._id}>{item.userid.firstname+' '+item.userid.lastname}</a>{item.userid.email===email2?<button style={{float:"right"}} onClick={()=>handleDelete(item._id)}><FontAwesomeIcon icon={faTrashAlt}  color="red" /></button>:null}
                      <div className="left-side-meta"><a href={'/review/'+item._id}>{item.date}...</a></div>
                      
                    </div>
                  </MDBCardBody>
                  
                  <MDBCardBody>
                    <div className="social-meta">
                    <Font family='Lato'>
                      <a>Restaurant: </a><a href={'/restaurant/'+item.placeid}>{item.resname}</a>
                      <p>Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.rate}/10 </p>
                      <p>Tag Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.tagrate}/10 </p>
                      <p>Ambience Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.ambiencerate}/10 </p>
                      <p>Tag: {item.tag}</p>
                      <p style={{fontSize:'20px', fontStyle:'italic'}}>{item.review}</p>
                      </Font>
                      <span>
                      {isindislikedby(item.dislikedBy)?null:<Button variant="primary" size="sm" onClick={()=>handleLikes(item._id)}  style={{marginRight:"50%"}} active>{item.likes} {isinlikedby(item.likedBy)?"Upvoted":"Upvote"} 
                          </Button>}
                          {isinlikedby(item.likedBy)?null:<Button variant="primary" size="sm" onClick={()=>handleDislikes(item._id)} active>{item.dislikes} {isindislikedby(item.dislikedBy)?"Downvoted":"Downvote"}
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
            </MDBRow></div>))}
                    
            </Jumbotron>
                    
                </div>
            )
            :null}
            {showWhich==="about"
            ?<About name={name} dob={dob} email={email}/>
            :null}
            {showWhich==="favorites"
            ?<ProfileFavorites id={id}/>
            :null}
            </div>
        </div>
    )}
}

export default Profile
