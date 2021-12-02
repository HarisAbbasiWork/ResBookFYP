import React, { useContext ,useLayoutEffect, useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar,NavItem, NavDropdown} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form' 
import FormControl from 'react-bootstrap/FormControl'
import { BrowserRouter as Router, Switch,useHistory, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'; 
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import AddReview from './AddReview'
import ShowReviews from './showreviews'
import Restaurantprofile from './restaurantprofile'
import EditProfile from './EditProfile'
import Profile from './Profile'
import NavBar2 from './NavBar2'
import axios from 'axios'
import ShowFriends from './ShowFriends';
import FriendsTab from './FriendsTab';
import LoginForm2 from './LoginForm2';
import Review from './Review';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import SearchedUsers from './SearchedUsers';
import CloudnarySignUp from './CloudnarySignUp';
import Trends from './Trends';
import Restaurants from './Restaurants';
import NearbyRestaurants from './NearbyRestaurants';
const data = JSON.parse(localStorage.getItem('data'))
console.log("Local Storage: ",data)
function NavBar() {
  const [user2, setUser2] = useState(data?data.fname+' '+data.lname:"Login");
  const [email2, setEmail2] = useState(data?data.email:"Login");
  const [islogged, setIslogged] = useState(data?"true":"false");
  const [userID, setUserID] = useState(data?data.id:0);
  const [userPic, setUserPic] = useState(data?data.propic:0);
  const [friends, setFriends] = useState(data?data.friends:[])
  const [inputvalue, setInputvalue]= useState("")
  const [test, setTest]= useState(null)
  
  
  const [redirectToReferrer, setRedirectToReferrer] = useState("false")
  useEffect(() => {
    console.log(process.env.TEST)
    console.log("Nav Bar rendered")
   
  },[]);
  
  
 
  const logout=() =>{
    setIslogged("false")
    setEmail2("Login")
    setUser2("Login")
    setUserID(0)
    setUserPic(0)
    setTest(test+1)
    localStorage.clear();
    
  }

    
    return (<Router>
        <div>
                <>
                <NavBar2 inputvalue={inputvalue} setInputvalue={setInputvalue} userID={userID} logout={logout} userPic={userPic} islogged={islogged} user2={user2} />
               
                <div className="auth-wrapper">
                  <div className="auth-inner">
                  
                    <Switch>
                      <Route exact path="/" >
                      {/* {islogged==="false" 
                      ? <Button href="/sign-in" style={{marginLeft: '500px',borderRadius: '25px', backgroundColor:'#990505'}} ><FontAwesomeIcon icon={faLocationArrow} color="white" /> Click Here To Login So You Can Add Review</Button>
                      :null
                      } */}
                       <ShowReviews test={test} userID={userID} islogged={islogged} email2={email2}/>
                      
                      </Route>
                      
                         <Route path="/sign-in" >
                        <LoginForm  setEmail2={setEmail2} setUserPic={setUserPic} setUserID={setUserID} setIslogged={setIslogged} setUser2={setUser2} setFriends={setFriends} user2={user2}/>
                         </Route>
                         
                      <Route path="/sign-up" component={CloudnarySignUp} />
                      
                      <Route path="/restaurant/:placeid" >
                        <Restaurantprofile email2={email2} userID={userID} islogged={islogged} inputvalue={inputvalue} />
                      </Route>
                      <Route path="/profilesetting" >
                        <EditProfile email2={email2} />
                      </Route>
                      <Route path="/forgetpassword" component={ForgetPassword}/>
                      <Route path="/trends" component={Trends}/>
                      <Route path="/restaurants" component={Restaurants}/>
                      <Route path="/nearbyrestaurants" component={NearbyRestaurants}/>
                      <Route path="/reset/:token" component={ResetPassword}/>
                      <Route path="/review/:reviewid" >
                        <Review email2={email2} userID={userID} />
                      </Route>
                      <Route path="/myfriends" >
                        <FriendsTab id={userID} islogged={islogged} />
                      </Route>
                      <Route path="/search/:query" >
                        <SearchedUsers id={userID} islogged={islogged} />
                      </Route>
                      <Route path="/profile/:id" >
                        <Profile email2={email2} userID={userID}></Profile>
                      </Route>
                    </Switch>
                    
                  </div>
                </div>
              </>
            
        </div></Router>
    )
}

export default NavBar
