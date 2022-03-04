import React, { useState, useEffect } from 'react'
import { MDBRow, MDBCard, MDBCardBody, MDBBtn, MDBIcon, MDBCol, MDBCardImage, MDBInput } from "mdbreact";
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { withRouter, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faLocationArrow, faTag, faMapMarkerAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { tags } from "./tags";
import ReactStars from 'react-stars'
import axios from 'axios'
import Font, { Text } from 'react-font'
import './showreviews.css'
function ShowReviews({ test, userID, islogged, email2,isshownotifications }) {
  const [items, setItems] = useState([])
  const [items2, setItems2] = useState([])
  const [resByTags, setresByTags] = useState(null)
  const [writingcomment, setWritingcomment] = useState([])
  const [test2, setTest2] = useState(test)
  const [update, setUpdate] = useState(0)
  const [option, setOption] = useState('Select Tag')

  let history = useHistory();

  const handleChange = (tag) => {
    setOption(tag)
    if (tag == 'All' || tag == 'Select Tag') {
      setItems2(items)
    } else {
      setItems2(items.filter(item => item.tag == tag))
    }
    axios.get('http://localhost:5000/resByTags/' + tag)
      .then(response => {
        console.log("Res By Tags: ", response.data)
        setresByTags(response.data);
        console.log("API got all reviews bro")

      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })

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
  useEffect(() => {
    axios.get('http://localhost:5000/getreviews')
      .then(response => {
        console.log(response.data)
        setItems(response.data);
        setItems2(response.data)
        console.log("API got all reviews bro")

      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })
    axios.get('http://localhost:5000/resByTags/All')
      .then(response => {
        console.log("Got Res By Tags For All ", response.data)
        setresByTags(response.data);
        console.log("API got all reviews bro")

      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })



  }, [test2, update])

  const handleDelete = (id) => {
    axios.post('/deletereview', {
      id: id
    })
      .then(function (response) {

      })
      .catch(function (error) {
        console.log('Error is ', error);
      });
    setItems2(items2.filter(review => review._id !== id))

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
  const isinlikedby = (likes) => {

    if (likes) {
      console.log(likes.includes(email2))
      return likes.includes(email2)
    } else {
      return false
    }




  }
  const isindislikedby = (dislikes) => {

    if (dislikes) {
      console.log(dislikes.includes(email2))
      return dislikes.includes(email2)
    } else {
      return false
    }




  }
  const style4 = {
    backgroundColor: "grey",
    color: "white",
    marginRight: "400px",
    marginLeft: "400px"
  };

  return (
    <div>



      {!isshownotifications?<div class="select" style={{ display: 'inline-block', marginLeft: '46%',position:'absolute', left:'40.5%' }}>
        
          <select name="Tags" class="tags" value={option}  onChange={(e) => handleChange(e.target.value)} >

            {tags.map(tag => <option value={tag}>{tag}</option>)}
          </select>
      </div>:null}
      <h3 id="headingstyles">Recent Reviews </h3>
      
      
      <div id="containerbtags">

        <div id="list-example" class="list-group">
          <Font family='Lato'>
            <div id="resbytagheaderdiv"><a id="resbytagheader">{"Top Restaurants "}
            </a></div></Font>
          {resByTags != null ? resByTags.map((res, index) => (<div  key={res.restaurant_doc[0].placeid} >
            <a class="list-group-item list-group-item-action" id="backcolor" href={'/restaurant/' + res.restaurant_doc[0].placeid}>
              <strong>Restaurant: </strong>{res.restaurant_doc[0].name} <br />
              <strong>Rated: </strong><FontAwesomeIcon icon={faStar} color="yellow" /> {res.avgRate}/10
            </a>


          </div>)) : null}

        </div>
      </div>
      <Jumbotron style={{
        height: '100%',
        Width: '100vw',
        backgroundImage: "url(" + '/content/grey2.jpg' + ")",
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundRepeat: 'repeat',
        backgroundHeight: '100%',

      }}>
        

        {items2.map(item => (<div style={{ marginLeft: '35%', marginRight: '35%', borderRadius: '50%', width:'45%' }} key={item.id}><MDBRow>
          <MDBCol >
            <MDBCard news className="my-5">
              <MDBCardBody >
                <div className="content" >
                  <img
                    src={item.userid.propic}
                    alt=""
                    height={40}
                    className="rounded-circle avatar-img z-depth-1-half"
                  />
                  <a style={{ marginLeft: '2%' }} href={'/profile/' + item.userid._id}>{item.userid.firstname + ' ' + item.userid.lastname}</a>{item.userid.email === email2 ? <button style={{ float: "right" }} onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrashAlt} color="red" /></button> : null}
                  <div className="left-side-meta"><a href={'/review/' + item._id}>{item.date}...</a></div>
                  <br/>
                </div>
              
                <div className="social-meta">
                  <Font family='Lato'>
                    <a>Restaurant: </a><a href={'/restaurant/' + item.placeid}>{item.resname}</a>
                    <p>Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.rate}/10 </p>
                    <a>Tag Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.tagrate}/10 </a><br/>
                    <a>Ambience Rated: <FontAwesomeIcon icon={faStar} color="yellow" /> {item.ambiencerate}/10 </a>
                    <p>Tag: <FontAwesomeIcon icon={faTag} color="blue" /> {item.tag}</p>
                    <hr />
                    <p style={{ fontSize: '20px', fontStyle: 'italic' }}>{item.review}</p>
                  </Font>
                  <span>
                      {isindislikedby(item.dislikedBy)?null:<Button variant="primary" size="sm" onClick={()=>handleLikes(item._id)}  style={{marginRight:"50%",backgroundColor: "#990505"}} active>{item.likes} {isinlikedby(item.likedBy)?"Upvoted":"Upvote"} 
                          </Button>}
                          {isinlikedby(item.likedBy)?null:<Button variant="primary" size="sm" onClick={()=>handleDislikes(item._id)} style={{backgroundColor: "#990505"}} active>{item.dislikes} {isindislikedby(item.dislikedBy)?"Downvoted":"Downvote"}
                          </Button>}
                
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
                
                <div class="row">
                  <div class="col-md-10">
                  <MDBInput far icon="heart"  hint="Add Reply..." onChange={e => onChange(e, item._id)} />
                  </div>
                  <div  class="col-md-2" style={{textAlign:'center'}}>
                  <Button variant="primary" size="sm" onClick={() => postComment(item._id)} style={{ backgroundColor: '#990505',padding: '10%' }} active> Reply</Button>

                  </div>
                
                
                
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow></div>))}

      </Jumbotron>
    </div>
  )
}

export default withRouter(ShowReviews)
