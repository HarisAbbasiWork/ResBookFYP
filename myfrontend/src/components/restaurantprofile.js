import React, { useState, useEffect } from 'react'
import { useParams, withRouter, useHistory } from "react-router-dom";
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import { MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput } from "mdbreact";
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { GeoAlt, GetAlt } from 'react-bootstrap-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTag, faTrashAlt, faInfoCircle, faGrinAlt, faSmile, faAngry } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import AddReview from './AddReview';
import { isFragment } from 'react-mui-multiselect-dropdown';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker'
import Font, { Text } from 'react-font'
import "./loginn.css";
function Restaurantprofile({ email2, userID, islogged, inputvalue,ishide,setIshide, searchres }) {
  let params = useParams();
  let history = useHistory();
  const [items, setItems] = useState([])
  const [backupitems, setBackupitems] = useState([])
  const [selectedSentiment, setSelectedSentiment] = useState("")
  const [resname, setResname] = useState()
  const [address, setAddress] = useState()
  const [besttag, setBesttag] = useState()
  const [worsttag, setWorsttag] = useState()
  const [message, setMessage] = useState()
  const [update, setUpdate] = useState(0)
  const [writingcomment, setWritingcomment] = useState([])
  const [personalizedrating, setPersonalizedrating] = useState(0)
  const [generalizedrating, setgeneralizedrating] = useState(0)
  const [googlerating, setGooglerating] = useState(0)
  
  const [ishidemap, setIshidemap] = useState(true)
  const [res, setRes] = useState([])
  const [location, setLocation] = useState(null)
  const [photos, setPhotos] = useState([])
  const [index, setIndex] = useState(0);
  const [isinfav, setIsinfav] = useState(null)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const getProfile = (placeid, restaurant) => {
    axios.get('http://localhost:5000/restaurant/' + placeid)
      .then(response => {
        console.log("Result From Backend", response.data)
        setResname(response.data.resprofile.name)
        setAddress(response.data.resprofile.address)
        setRes({
          name: response.data.resprofile.name,
          placeid: placeid,
          resid: response.data.resprofile._id
        })
        setLocation({
          lat: response.data.data.result.geometry.location.lat,
          lng: response.data.data.result.geometry.location.lng
        })
        setPhotos(response.data.data.result.photos)
        console.log(response.data.data.result.photos)
        setGooglerating(response.data.data.result.rating)
        axios.post('/checkinfav', {
          userid: userID,
          resid: response.data.resprofile._id
        })
          .then(function (response) {
            console.log("isittrue",response.data.isexist)
            setIsinfav(response.data.isexist)
          })
          .catch(function (error) {
            console.log('Error is ', error);
          });



      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })
  }
  const getResTags = (placeid) => {
    axios.get('http://localhost:5000/getTags/' + placeid)
      .then(response => {
        console.log("Tags Result From Backend", response.data)
        setBesttag(response.data.besttag)
        setWorsttag(response.data.worsttag)
        setMessage(response.data.message)

      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })
  }
  const checkIfExists = (placeid, address) => {
    var restaurant = inputvalue.split(',');
    console.log("Restarant name from input value split main", restaurant[0])
    axios.post('/restaurantexists', {
      placeid: placeid,
      name: restaurant[0],
      address: address
    })
      .then(function (response) {
        console.log(response.data)
        getProfile(params.placeid, restaurant[0])
        getReviews(params.placeid)
        getResTags(params.placeid)


      })
      .catch(function (error) {
        console.log('Error is ', error);
      });
  }
  const handleDelete = (id) => {
    axios.post('/deletereview', {
      id: id
    })
      .then(function (response) {

      })
      .catch(function (error) {
        console.log('Error is ', error);
      });
    setItems(items.filter(review => review._id !== id))

  }
  const SetSentimentsl = (string) => {
    console.log(string)
    if (selectedSentiment == string) {
      setSelectedSentiment("")
      setItems(backupitems)
    } else {
      setSelectedSentiment(string)
      setItems(backupitems.filter(review => review.sentiment == string))

    }

  }
  const getRatings = (placeid) => {
    axios.get('http://localhost:5000/getSumRatings/' + placeid + '/' + email2)
      .then(response => {
        console.log("Restaurant ratings: ", response.data)
        setgeneralizedrating(response.data.generalizedrating)
        setPersonalizedrating(response.data.personalizedrating)
        /*if(islogged=="true"){console.log("We have friends too xD",friends)}
        var total=0
        var sum=0
        var ftotal=0
        var fsum=0
        response.data.forEach(element => {
          sum=sum+parseInt(element.rate)
          total++
        });
        function isFriend(value) {
          return friends.includes(value)
        }
        var friendsrating=response.data.filter(isFriend(response.data.user))
        console.log("Friends rating",friendsrating)
        setgeneralizedrating(sum/total)
        console.log("Generalized: ",sum/total, "sum: ",sum," total: ",total)
        if(ftotal=0){
          console.log("No friend rated this restaurant")
        }else{
          console.log("Personalized: ",fsum/ftotal, "fsum: ",fsum," ftotal: ",ftotal)
        }*/


      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })
  }
  const getReviews = (placeid) => {
    axios.get('http://localhost:5000/getrreviews/' + placeid,{
      headers:{
          "x-access-token":localStorage.getItem("token")
      }
  })
      .then(response => {
        console.log(response.data)
        setItems(response.data)
        setBackupitems(response.data)
        console.log("API got all reviews bro")
        getRatings(placeid)

      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })
  }
  const handleLikes = (id) => {
    axios.post('/increaselikes', {
      postid: id,
      likedby: email2
    })
      .then(function (response) {
        console.log("Like response: ", response.data)
        setUpdate(update + 1)

      })
      .catch(function (error) {
        console.log('Error is ', error);
      });

  }
  const handleDislikes = (id) => {
    axios.post('/increasedislikes', {
      postid: id,
      dislikedby: email2
    })
      .then(function (response) {
        console.log("Dislike response: ", response.data)
        setUpdate(update + 1)

      })
      .catch(function (error) {
        console.log('Error is ', error);
      });

  }
  const onChange = (e, id) => {
    console.log(e.target.value, " and postid ", id)
    const comment = {
      postid: id,
      comment: e.target.value
    }
    var updates = writingcomment
    const objIndex = updates.findIndex((obj => obj.postid == id));
    if (objIndex < 0) {
      const comment = {
        postid: id,
        comment: e.target.value
      }
      updates = [...writingcomment, comment]

    } else {
      //Log object to Console.
      console.log("Before update: ", updates[objIndex], "also index", objIndex)
      //Update object's name property.
      updates[objIndex].comment = e.target.value
      //Log object to console again.
      console.log("After update: ", updates[objIndex])

    }

    setWritingcomment(updates)
  }
  const postComment = (id) => {
    var updates = writingcomment
    const objIndex = updates.findIndex((obj => obj.postid == id));
    if (objIndex < 0) {
      alert("You posting empty comment")

    } else {
      //Log object to Console.
      console.log("Before update: ", updates[objIndex], "also index", objIndex)
      //Update object's name property.
      console.log("comment: ", updates[objIndex].comment)
      axios.post('/addcomment', {
        postid: id,
        userid: userID,
        comment: updates[objIndex].comment
      })
        .then(function (response) {
          console.log(response.data)
          history.push('/review/' + response.data.postid);
        })
        .catch(function (error) {
          console.log('Error is ', error);
        });

    }



  }
  const addtoFav =()=>{
    console.log("placeid: ",params.placeid,"userid",userID)
    axios.post('/addtofav', {
      userid: userID,
      resid: res.resid
    })
      .then(function (response) {
        setUpdate(update + 1)

      })
      .catch(function (error) {
        console.log('Error is ', error);
      });
  }
  const removefromFav =()=>{
    console.log("placeid: ",params.placeid,"userid",userID)
     axios.post('/removefromfav', {
       userid: userID,
       resid: res.resid
     })
       .then(function (response) {
         setUpdate(update + 1)

       })
       .catch(function (error) {
        console.log('Error is ', error);
       });
  }
  useEffect(() => {
    var restaurant = inputvalue.split(',');
    console.log(inputvalue)
    if (inputvalue != "") {
      if (restaurant.length > 1) {
        console.log("We opening profile " + params.placeid, inputvalue)
        
        geocodeByPlaceId(params.placeid)
          .then(results => {
            checkIfExists(params.placeid, results[0].formatted_address)
          })
          .catch(error => console.error(error));
      }
    } else {

      console.log("We opening profile and input value null which means we no searching" + params.placeid, inputvalue)
      getProfile(params.placeid, restaurant[0])
      console.log("Restaurant ", restaurant[0])
      getReviews(params.placeid)
      getResTags(params.placeid)
      setRes({
        name: restaurant[0],
        placeid: params.placeid,

      })


    }
    
    

    










  }, [params, update])
  const defaultProps = {
    center: {
      lat: location != null ? location.lat : 33.6907514,
      lng: location != null ? location.lng : 73.0410963
    },
    zoom: 16
  };
  const expandMap = () => {
    setIshidemap(false)

  }
  return (
    <div>

      <div >
        <Jumbotron id="jback" style={{}}>
          {worsttag == null ? <a id="besttag1">{message}</a> : <a id="besttag1">Worst Tag: {worsttag}</a>}
          {besttag == null ? <a id="besttag">{message}</a> : <a id="besttag">Best Tag: {besttag}</a>}
          <h1 style={{ display: 'inline-block' }}>{resname}</h1>
          {isinfav==null?null:!isinfav?
          <Button onClick={() => addtoFav() } style={{ backgroundColor: '#990505', padding:'4px', marginLeft:'30px' }}><GeoAlt />Add To Favorites</Button>
        :<Button onClick={() => removefromFav() } style={{ backgroundColor: '#990505', padding:'4px', marginLeft:'30px' }}><GeoAlt />Remove From Favorites</Button>}
          <p> Generalized-Rating: <FontAwesomeIcon icon={faStar} color="yellow" /> {generalizedrating == null ? "No Resbook User Rated This Restaurant Yet" : generalizedrating} </p>
          {islogged == "true" ? personalizedrating ? <p> Personalized Rating: <FontAwesomeIcon icon={faStar} color="yellow" />  {personalizedrating} </p> : <p>No Friend Rated This Restaurant</p> : null}
          <p> Google Rating: <FontAwesomeIcon icon={faStar} color="yellow" />  {googlerating} </p>
          {location == null ? null : <a><GeoAlt />{address + " Lat: " + location.lat}</a>}
          <a style={{ float: "right", fontWeight:'bold' }}>Price</a><br></br>
          <Font family='Roboto Condensed'>
          <a style={{ float: "right", fontSize:'35px' }}>PKR PKR PKR</a>
          </Font>
          {islogged == "true" && ishide ? <Button style={{ marginLeft: '45%', backgroundColor: '#990505', width: '9%' }} onClick={() => { setIshide(false) }}><GeoAlt />Check-In</Button> : null}
          
          {islogged == "true" && !ishide ? <AddReview userID={userID} email2={email2} res={res} params={params} setUpdate={setUpdate} update={update}  /> : null}
        </Jumbotron>
      </div>
      


      {/* <div className="back" style={{  
                height:'100vh',
                Width: '100vw',
                backgroundImage: "url(" + '/content/grey2.jpg' + ")",
                backgroundPosition: 'center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
                backgroundHeight: '100%',
                //backgroundColor:"transparent",
                marginTop:"0px",
              }}> */}

      <h3 style={{ borderLeft: '6px solid #1423A4', backgroundColor: '#990505', color: '#FFFFFF' }}>           </h3>
      <div style={{ display: 'flex' }}>
        {photos && (<Carousel style={{ height: "140%", width: "100%", borderRight:'5px solid #990505' }} activeIndex={index} onSelect={handleSelect}>
          {photos.map((photo, index) => (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=AIzaSyCpYoojDkdgcjj-P8bBP0fQ-Fau-UPdYCc`}
                alt="First slide"
                style={{ height: "400px", width: "800px" }}
              />
              <Carousel.Caption>
                <h3>{resname} Gallery {index + 1}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}

        </Carousel>)}
        <div style={{ height: '48vh', width: '100%' }}>
          {location == null ? null : <GoogleMapReact
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker
              lat={location.lat}
              lng={location.lng}
              name={resname}
              color="blue"
            />
          </GoogleMapReact>}
        </div>
        {/* {ishidemap ? <div id="getresbutton2" onClick={() => expandMap()} >
          <a id="getrestext">Expand Map</a>
        </div> : null} */}
      </div>

      <h3 style={{ borderLeft: '6px solid #1423A4', backgroundColor: '#990505', color: '#FFFFFF' }}>Restaurant Reviews </h3>


      <Jumbotron style={{
        height: '100%',
        Width: '100%',
        backgroundImage: "url(" + '/content/grey2.jpg' + ")",
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundRepeat: 'repeat',
        backgroundHeight: '100%',
        //backgroundColor:"transparent",
        marginTop: "0px"
      }} >
        <Button onClick={() => SetSentimentsl("Positive")} size="lg" style={{ marginLeft: '20%', height: '15%', borderRadius: '22px', backgroundColor: selectedSentiment == "Positive" ? "#260033" : '#990505' }}><FontAwesomeIcon icon={faGrinAlt} color="white" /> Positive</Button>
        <Button onClick={() => SetSentimentsl("Neutral")} size="lg" style={{ marginLeft: '20%', height: '15%', borderRadius: '22px', backgroundColor: selectedSentiment == "Neutral" ? "#260033" : '#990505' }}><FontAwesomeIcon icon={faSmile} color="white" /> Neutral</Button>
        <Button onClick={() => SetSentimentsl("Negative")} size="lg" style={{ marginLeft: '20%', height: '15%', borderRadius: '22px', backgroundColor: selectedSentiment == "Negative" ? "#260033" : '#990505' }}><FontAwesomeIcon icon={faAngry} color="white" /> Negative</Button>
        {/*<Jumbotron style={{backgroundColor:'#990505',display:'inline-block'}}>
              
                <FontAwesomeIcon icon={faInfoCircle} size="lg" color="white" /><h1 style={{color:'white',display:'inline-block'}}> Different reviews have different sentiments as they express a user’s opinion. With the help of AI these reviews are categorized.</h1>
              
            </Jumbotron>*/}
        <div >
          {items.map(item => (<div style={{ marginLeft: '35%', marginRight: '35%' }} key={item._id}><MDBRow>

            <MDBCol>
              <MDBCard news className="my-5">
                <MDBCardBody>
                  <div className="content">
                    <img
                      src={item.userid.propic}
                      alt=""
                      height={40}
                      className="rounded-circle avatar-img z-depth-1-half"
                    />
                    <a style={{ marginLeft: '2%' }} href={'/profile/' + item.userid._id}>{item.userid.firstname + ' ' + item.userid.lastname}</a>{item.userid.email === email2 ? <button style={{ float: "right" }} onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrashAlt} color="red" /></button> : null}
                    <div className="left-side-meta"><a href={'/review/' + item._id}>{item.date}...</a></div>

                  </div>
                </MDBCardBody>

                <MDBCardBody>
                  <div className="social-meta">
                    <Font family='Lato'>
                      <a>Restaurant: </a><a href={'/restaurant/' + item.placeid}>{item.resname}</a>
                      <p>Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.rate}/10 </p>
                      <p>Tag Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.tagrate}/10 </p>
                      <p>Ambience Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.ambiencerate}/10 </p>
                      <p>Tag: <FontAwesomeIcon icon={faTag} color="blue" /> {item.tag}</p>
                      <p style={{ fontSize: '20px', fontStyle: 'italic' }}>{item.review}</p>
                    </Font>
                    <span>
                      <Button size="sm" onClick={() => handleLikes(item._id)} style={{ marginRight: "170px", backgroundColor: '#990505' }} active>{item.likes} Upvote
                      </Button>
                      <Button style={{ backgroundColor: '#990505' }} size="sm" onClick={() => handleDislikes(item._id)} active>{item.dislikes} Downvote
                      </Button>

                    </span>
                  </div>
                  {item.comments.map(comment => (
                    <div style={{ backgroundColor: '#f2f4f6', marginTop: '1%' }}>
                      <img
                        src={comment.user.propic}
                        alt=""
                        height={40}

                        className="rounded-circle avatar-img z-depth-1-half"
                      />
                      <a href={'/profile/' + comment.user._id}>{comment.user.firstname + ' ' + comment.user.lastname}</a>

                      <a>{': ' + comment.text}</a>
                    </div>


                  ))}
                  <hr />
                  <MDBInput far icon="heart" hint="Add Reply..." onChange={e => onChange(e, item._id)} />
                  <Button size="sm" onClick={() => postComment(item._id)} style={{ marginLeft: "85%", backgroundColor: '#990505' }} active> Reply
                  </Button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow></div>))}
        </div>
      </Jumbotron>
      {/* </div> */}
    </div>
  )
}

export default Restaurantprofile
