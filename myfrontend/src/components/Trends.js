import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import "./loginn.css";
import HeatMap from './HeatMap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { faStar, faLocationArrow, faTag, faMapMarkerAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import Font, { Text } from 'react-font'
function Trends() {
    const [trendings, setTrendings] = useState([])
    const [series2, setSeries2] = useState([])
    const getTrendingRes = () => {
        axios.get('http://localhost:5000/trendingRestaurants')
            .then(response => {
                console.log("Trending Restaurants: ", response.data)
                setTrendings(response.data.result)
                setSeries2(response.data.series)
            })
            .catch(function (error) {
                console.log(error);
                console.log("Aey te error hai bro")
            })
    }
    useEffect(() => {
        getTrendingRes()

    }, []);
    return (
        <div >
            {/* <div id="trendback">
                <div id="headerdiv">
                <h1 id="trendheader">The Trending Restaurants in Islamabad, November 2021</h1>
                </div>
                <div id="carted">
                    {trendings.map((trending,index) => (
                    <div><a id="listitems" href={'/restaurant/'+trending.inventory_docs[0].placeid}>{index+1+' '+trending.inventory_docs[0].name}</a><br/></div>
                    ))}
                </div>
                 <HeatMap series2={series2} /> 
                
            </div> */}
            <div id="containerbtags">

                <div id="list-example" class="list-group">
                    <Font family='Lato'>
                        <div id="resbytagheaderdiv"><a id="resbytagheader">{"Trending Restaurants"}
                        </a></div></Font>
                    {trendings != null ? trendings.map((res, index) => (<div key={res.inventory_docs[0].placeid} >
                        <a class="list-group-item list-group-item-action" id="backcolor" href={'/restaurant/' + res.inventory_docs[0].placeid}>
                            <strong>Restaurant: </strong>{res.inventory_docs[0].name} <br />
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

                <HeatMap series2={series2} />
            </Jumbotron>
        </div>
    )
}

export default Trends
