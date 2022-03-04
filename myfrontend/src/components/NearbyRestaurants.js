import React from 'react'
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import NearMarker from './NearMarker'
import GoogleMapReact from 'google-map-react';
import "./loginn.css";
const AnyReactComponent = ({ text }) => <div>{text}</div>;
function NearbyRestaurants() {
    const [nearbyRes, setNearbyres] = useState(null);
    const [location, setLocation] = useState(null)
    useEffect(() => {
      
        
      }, []);
      const getRestaurants=async()=>{
          var latitude
          var Longitude
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            defaultProps.center.lat=position.coords.latitude
            
            
            console.log("Longitude is :", position.coords.longitude);
            defaultProps.center.lng=position.coords.longitude
            var data={
              lat: position.coords.latitude,
              lng:position.coords.longitude
            }
            console.log("data",data)
            setLocation(data)
            axios
      .get("http://localhost:5000/NearbyRestaurants/"+position.coords.latitude+"/"+position.coords.longitude)
      .then((response) => {
        console.log(response.data.results);
        setNearbyres(response.data.results)
      })
      .catch(function (error) {
        console.log(error);
        console.log("error");
      });
          });
        
    
    }
    
    
      const defaultProps = {
        center: {
          lat: location != null ? location.lat :33.6920576,
          lng: location != null ? location.lng :72.9776128
        },
        zoom: 15
      };
    return (
        <div id={nearbyRes?"aftergetrestaurants":"trendback3"}>
             <div id="headerdiv2">
            <h1 id="trendheader">Nearby Restaurants</h1>
            </div>
            {!nearbyRes?<div id="getresbutton" onClick={()=>getRestaurants()}>
                <a id="getrestext">Get Restaurants</a>
            </div>:null}
            <div style={{ height: '100vh', width: '100%', marginTop:'0%' }}>
{nearbyRes?<GoogleMapReact
   defaultCenter={defaultProps.center}
   defaultZoom={defaultProps.zoom}
 >
 {nearbyRes?nearbyRes.map((c) => (
              <NearMarker
              lat={c.geometry.location.lat}
              lng={c.geometry.location.lng}
              name={c.name}
              color="blue"
            />
            )):null}
 </GoogleMapReact>:null}
</div>
            

        </div>
    ) 
}

export default NearbyRestaurants
