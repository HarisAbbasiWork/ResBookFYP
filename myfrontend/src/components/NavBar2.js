import React, { useState, useEffect } from 'react'
import { Navbar, NavItem, NavDropdown, Dropdown, DropdownButton } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import axios from 'axios'
import './comsCSS.css'

import { withRouter, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { faUserAlt, faSignInAlt, faUserLock, faHome, faUsers, faChartLine, faBell, faFlagCheckered, faUtensils, faGlobe } from '@fortawesome/free-solid-svg-icons'
function NavBar2({ userID, logout, userPic, islogged, user2, inputvalue, setInputvalue,setIsshownotifications, isshownotifications,setIshide }) {
  let history = useHistory();
  const [notifications, setNotifications] = useState([])
  
  const [show, setShow] = useState(false);

  const showDropdown = (e) => {
    setShow(true);
  }
  const hideDropdown = e => {
    setShow(false);
  }
  const opensettings = () => {
    setInputvalue("")
    history.push('/profilesetting');



  }

  const openProfile = () => {
    setInputvalue("")
    history.push('/profile/' + userID);

  }
  const openN = () => {
    setIsshownotifications(!isshownotifications)

  }


  const openhome = () => {
    setInputvalue("")
    history.push('/');
  }
  const openFriends = () => {
    setInputvalue("")
    history.push('/myfriends');
  }
  const getFRandNotifications = async () => {
    console.log("getting notifications")

    await axios.get('http://localhost:5000/notifications/' + userID)
      .then(response => {
        console.log(response.data)
        setNotifications(response.data)
      })
      .catch(function (error) {
        console.log(error);
        console.log("Aey te error hai bro")
      })

  }


  useEffect(() => {
    if (islogged === "true") {
      getFRandNotifications()


    }



  }, [islogged]);
  const searchOptions = {
    location: new window.google.maps.LatLng(33, 73),
    radius: 2000
  }
  const handleInput = async value => {
    console.log(value)
    const placedetails = await geocodeByAddress(value)
    console.log(placedetails)
    console.log(placedetails[0].types)
    console.log(placedetails[0].formatted_address)
    var restaurant = value.split(',');
    /*setRes({
      name:restaurant[0],
      placeid:placedetails[0].place_id,
      address: placedetails[0].formatted_address
    })*/
    if (placedetails[0].formatted_address.includes("Islamabad")) {
      if (placedetails[0].types.includes("restaurant")) {
        //setError(null)
        history.push('/restaurant/' + placedetails[0].place_id);
        setIshide(true)
        console.log("error set to null")

      } else {
        if (placedetails[0].types.includes("food")) {
          //setError(null)
          history.push('/restaurant/' + placedetails[0].place_id);
          setIshide(true)
        } else {
          alert("Error: Not A Restaurant, Please Select Restaurant In Islamabad")
        }

      }
    } else {
      console.log("Out Of Islamabad")
      alert("Error: Not A Restaurant, Please Select Restaurant In Islamabad")

    }

    setInputvalue(value)
  }
  const onChangeValue = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      console.log("its null")
      history.push('/');
    } else {
      history.push('/search/' + event.target.value);

    }

  }
  return (
    <div>
      <Navbar className="color-nav"  variant="dark">
        <a style={{ marginLeft: '-4px', marginRight: '3px', marginTop: "-2px", marginBottom: "-2px" }}><img
          onClick={openhome}
          src="/logoRR.jpg"
          alt=""
          height={55}
          width={55}
          style={{ marginRight: "10px", borderStyle: "double", borderColor: "#b30000", }}
          className="rounded-circle avatar-img z-depth-1-half"
        /></a>

        <PlacesAutocomplete value={inputvalue} onChange={setInputvalue} searchOptions={searchOptions} onSelect={handleInput} >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div style={{zIndex:6}}><input style={{ backgroundColor: 'white', borderRadius: '12px', border: 'none',padding:'5%' }} {...getInputProps({ placeholder: "   Search Restaurant" })} />
              <div style={{ position: "absolute", top: "100%",boxShadow: "5px 5px 5px #460303bb" }}>
                {loading ? <div style={{ color: "white" }}>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  const inputstyle = {
                    backgroundColor: suggestion.active ? '#800505' : "#9e0808",
                    
                    padding:'2%',
                    color: "white"
                  }
                  return (<div {...getSuggestionItemProps(suggestion)} style={inputstyle}>
                    {suggestion.description}
                  </div>)
                })}

              </div>
            </div>
          )}</PlacesAutocomplete>


        <Nav style={{ marginLeft: islogged === "true" ? "30%" : "30%" }} className="mr-auto">
          <Nav.Link style={{ color: 'white', fontSize: "20px" }} onClick={openhome}><FontAwesomeIcon icon={faHome} color="white" /></Nav.Link>
          <Nav.Link style={{ color: 'white', marginLeft: "10%", fontSize: "20px" }} href={'/myfriends'}><FontAwesomeIcon icon={faUsers} color="white" /></Nav.Link>
          <Nav.Link style={{ color: 'white', marginLeft: "10%", fontSize: "20px" }} href={'/trends'}><FontAwesomeIcon icon={faChartLine} color="white" /></Nav.Link>
          <Nav.Link style={{ color: 'white', marginLeft: "10%", fontSize: "20px" }} href={'/restaurants'}><FontAwesomeIcon icon={faUtensils} color="white" /></Nav.Link>
          <Nav.Link style={{ color: 'white', marginLeft: "10%", fontSize: "20px" }} href={'/nearbyrestaurants'}><FontAwesomeIcon icon={faGlobe} color="white" /></Nav.Link>
        </Nav>
        {islogged === "true"
          ? null
          : <Nav style={{ position: 'absolute', right: 85 }} className="mr-auto">
            <Nav.Link style={{ color: 'white' }} to="/sign-up" href="/sign-up"><FontAwesomeIcon icon={faUserLock} color="white" /> Signup</Nav.Link>
            <Nav.Link style={{ color: 'white' }} to="/sign-in" href="/sign-in"><FontAwesomeIcon icon={faSignInAlt} color="white" /> Signin</Nav.Link>
          </Nav>
        }

        <Nav style={{ position: 'absolute', right: 15, top: 9, backgroundColor:'white', borderRadius:'20px', paddingRight:'15px' }} className="mr-auto">
        {islogged === "true" ? <NavDropdown show={show}
            onMouseEnter={showDropdown}
            onMouseLeave={hideDropdown}
            style={{ color: 'black' }} id="collasible-nav-dropdown">
            <NavDropdown.Item eventKey="4.1" onClick={logout}>Logout</NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2" onClick={opensettings}>Account Setting</NavDropdown.Item>

          </NavDropdown>
            : null}
          {islogged === "true"
            ? <Nav.Link onClick={openProfile} onMouseEnter={showDropdown} onMouseLeave={hideDropdown} style={{ color:'black' }} ><img
              src={userPic}
              alt=""
              height={30}
              style={{ marginRight: "10px" }}
              className="rounded-circle avatar-img z-depth-1-half"
            />{user2}</Nav.Link>
            : null}
            {islogged === "true"
            ? <Nav.Link style={{ color: 'black' }} onClick={openN} ><FontAwesomeIcon icon={faBell} color="black" /></Nav.Link>
            : null}
          
          





        </Nav>
      </Navbar>
      {inputvalue == "" ? null : <div></div>}
      {isshownotifications ? notifications.length > 0 ? <div style={{ float: 'right', backgroundColor: 'white', width: '20%',zIndex:12 }}>
        <h1 style={{ backgroundColor: '#990505', color: '#fff1c1', textAlign: 'center' }}><FontAwesomeIcon icon={faFlagCheckered} color="white" /> Notifications</h1>
        {notifications.map(notification => (
          notification.type == "Post" ? <div style={{ marginBottom: '4%', padding: '1%' }} ><img
            src={notification.userid.propic}
            alt=""
            height={30}
            style={{ marginRight: "10px" }}
            className="rounded-circle avatar-img z-depth-1-half"
          /><a style={{ color: 'black', padding: '2%', marginTop: '5%' }} href={'/review/' + notification.id}>{notification.userid.firstname + ' ' + notification.userid.lastname} liked your post</a><br></br></div> :
            notification.type == "Request" ? <div><img
              src={notification.userid.propic}
              alt=""
              height={30}
              style={{ marginRight: "10px" }}
              className="rounded-circle avatar-img z-depth-1-half"
            /><a style={{ color: 'black', padding: '2%', marginTop: '5%' }} href={'/profile/' + notification.id}>{notification.userid.firstname + ' ' + notification.userid.lastname} sent you a friend request</a><br></br></div> :
              <div><img
                src={notification.userid.propic}
                alt=""
                height={30}
                style={{ marginRight: "10px" }}
                className="rounded-circle avatar-img z-depth-1-half"
              /><a style={{ color: 'black', padding: '2%', marginTop: '5%' }} href={'/profile/' + notification.id}>{notification.userid.firstname + ' ' + notification.userid.lastname} accepted your a friend request</a><br></br></div>
        ))}

      </div> : <div style={{ float: 'right', backgroundColor: 'white', width: '20%' }}><a>No Notifications</a></div> : null}
    </div>
  )
}

export default withRouter(NavBar2)
