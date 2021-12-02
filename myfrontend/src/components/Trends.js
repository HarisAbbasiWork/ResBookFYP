import React,{useEffect, useContext, useState} from 'react'
import axios from 'axios'
import "./loginn.css";
import HeatMap from './HeatMap';

function Trends() {
    const [trendings, setTrendings]=useState([])
    const [series2, setSeries2]=useState([])
    const getTrendingRes=()=>{
        axios.get('http://localhost:5000/trendingRestaurants')
            .then(response => {
                console.log("Trending Restaurants: ",response.data)
                setTrendings(response.data.result)
                setSeries2(response.data.series)
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    useEffect(() => {
        getTrendingRes()
        
      },[]);
    return (
        <div >
            <div id="trendback">
                <div id="headerdiv">
                <h1 id="trendheader">The Trending Restaurants in Islamabad, November 2021</h1>
                </div>
                <div id="carted">
                    {trendings.map((trending,index) => (
                    <div><a id="listitems" href={'/restaurant/'+trending.inventory_docs[0].placeid}>{index+1+' '+trending.inventory_docs[0].name}</a><br/></div>
                    ))}
                </div>
                 <HeatMap series2={series2} /> 
                
            </div>
        </div>
    )
}

export default Trends
