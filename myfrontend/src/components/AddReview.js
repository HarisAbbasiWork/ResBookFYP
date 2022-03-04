
/* eslint-disable no-undef */

import React, { useState, useEffect, useMemo } from 'react'

import Dropdown from 'react-mui-multiselect-dropdown'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import { tags } from "./tags";
import Icon from '@material-ui/core/Icon'
import Select from "react-select";
import ReactStars from "react-stars";
import { Paper, Grid, Typography, makeStyles, Button } from '@material-ui/core'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import './showreviews.css'
import ReactStarsRating from 'react-awesome-stars-rating';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

const useStyles2 = makeStyles((theme) => ({

  error: {
    color: theme.palette.error.dark,
    fontSize: '1em'
  },
  checkBox: {
    color: 'Purple'
  }

}))


function AddReview(props) {


  const [selectedOption2, setSelectedOption2] = useState(null);
  const [rating, setRating] = useState(null);
  const [tagrating, settagRating] = useState(null);
  const [ambiencerating, setAmbienceRating] = useState(null);
  const onChange = (value) => {
    console.log(`React Stars Rating value is ${value}`);
    setValue(value)
  };
  const [value, setValue] = useState(0);




  const [showreviewnowbeposted, setShowreviewnotbeposted] = useState(true)

  const [review, setReview] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [items, setItems] = useState([])
  const [email, setEmail] = useState(props.email2)
  const handleChange = (e) => {
    setSelectedOption2(e.target.value)
  }



  const addItem = async () => {
    const onlySpaces = (str) => {
      console.log("review to be checked", str)
      return str.trim().length === 0;
    }

    console.log("User email in AR: ", props.email2, props.userid, selectedOption2, props.res)
    const URL = "http://localhost:5000/additem";
    var data2 = {
      user: props.email2,
      resname: props.res,
      date: new Date().toLocaleString(),
      rate: rating,
      tagrate: tagrating,
      ambiencerate: ambiencerating,
      tag: selectedOption2,
      review: review,
      userid: props.userid
    }
    console.log(data2);
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

      }
    }
    if (selectedOption2 == null || showreviewnowbeposted || tagrating == null || ambiencerating == null || rating == null) {
      if (selectedOption2 == null) {
        setError("No Tag Selected")
        return
      }
      console.log("showreviewnowbeposted: ", showreviewnowbeposted)
      if (showreviewnowbeposted) {
        setError("Empty review not allowed")
        return
      }
      if (tagrating == null || ambiencerating == null || rating == null) {
        setError("Ratings shouldn't be null")
        return
      }


    }

    axios(options).then(response => {
      console.log(response)

      setSuccess("Review Posted Successfully")
      props.setUpdate(props.update + 1)

    })
      .catch(error => {
        console.log(error.response)
      });

  }
  const inputProps = {
    step: 300,
  };
  const classes = useStyles();



  const style = {
    backgroundColor: "#990505",
    marginRight: "400px",
    padding: '1%',
    boxShadow: "5px 5px 5px #460303bb",
    borderRadius: '20px',
    marginLeft: "400px"
  };
  const style4 = {
    backgroundColor: "grey",
    color: "white",
    marginRight: "400px",
    marginLeft: "400px"
  };
  const style3 = {
    color: "white"
  };
  const style2 = {

    marginright: "20px"
  };
  useEffect(() => {
    console.log("Tags are", tags)
    console.log("props.res are", props.res)
    console.log("Add review rendered")
    
    if (window.location.pathname) {
      console.log(window.location.pathname)
    }
  }, [window.location.pathname])
  const ratingChanged = (newRating) => {
    console.log(newRating)
    setRating(newRating)
  }
  const onlySpaces = (str) => {
    return str.trim().length === 0;
  }
  const reviewonchange = (revieww) => {
    console.log(revieww)
    console.log(onlySpaces(revieww))
    setShowreviewnotbeposted(onlySpaces(revieww))
    setReview(revieww)
  }

  const ratingChanged2 = (newRating) => {
    console.log(newRating)
    settagRating(newRating)
  }
  const ratingChanged3 = (newRating) => {
    console.log(newRating)
    setAmbienceRating(newRating)
  }


  return (
    <div style={{ marginTop: '7%' }}>
      <hr />
      <br />
      <br />
      <div style={style}>

        <a style={style3}>Rate: </a>
        <ReactStarsRating onChange={ratingChanged} count={10} value={rating} /><br></br>

        <a style={style3}>Tag Rate: </a>

        <ReactStarsRating onChange={ratingChanged2} count={10} value={tagrating} /><br></br>
        <a style={style3}>Ambience Rate: </a>

        <ReactStarsRating onChange={ratingChanged3} count={10} value={ambiencerating} /><br></br>
        <br></br>
        <a style={style3}>Tags: </a>

        <select name="Tags" value={selectedOption2} onChange={handleChange}>
          {tags.map(item => <option value={item}>{item}</option>)}
        </select>
        <br></br>
        <br></br>
        <div style={{ display: 'flex' }}>
          <a style={style3}>Review: </a>
          <textarea onChange={(e) => reviewonchange(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>




          <Button variant="contained"
            color="primary"
            id="buttonaddrevstyles"
            className={classes.button}
            onClick={() => addItem()}
          >Post
          </Button>
        </div>
        {error ? success ? null : <div class="alert alert-danger" role="alert">{error}</div> : null}
        {success ? <div class="alert alert-success" style={{marginTop:'1%'}} role="alert">{success}</div> : null}
      </div>
      <br />
      <br />
      <br />
      <br />






    </div>
  )

}


export default AddReview
