import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import "./loginn.css";
import axios from 'axios'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
function Restaurants() {
    const [restaurants, setRestaurants]=useState([])
    const handlePageClick = (data) => {
        /* const newOffset = (event.selected * itemsPerPage) % items.length;
        console.log(
          `User requested page number ${event.selected}, which is offset ${newOffset}`
        ); 
        setItemOffset(newOffset) */;
        console.log(data.selected+1)
        axios.get('http://localhost:5000/allrestaurants/'+(data.selected+1))
            .then(response => {
              console.log(response.data)
              setRestaurants(response.data)
                console.log("API got all reviews bro")
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
      }; 
      const getRestaurants = () => {
        axios.get('http://localhost:5000/allrestaurants/1')
            .then(response => {
              console.log(response.data)
              setRestaurants(response.data)
              console.log("API got all reviews bro")
                
            })
            .catch(function (error){
                console.log(error);
                console.log("Aey te error hai bro")
            })
      };
      useEffect(() => {
        
        getRestaurants()
        
    }, [])
    return (
        <div style={{
          height: '100%',
          Width: '100vw',
          backgroundImage: "url(" + '/content/grey2.jpg' + ")",
          backgroundPosition: 'center',
          backgroundSize: '100%',
          backgroundRepeat: 'repeat',
          backgroundHeight: '100%',
  
        }}>
          
            {restaurants.map(restaurant=>(
            <div style={{marginTop:'1%'}}>
            <div class="jumbo2" href={'/restaurant/'+restaurant.placeid}>
                <a class="title2">{restaurant.name}</a>
            </div></div>
            ))}
            <ReactPaginate
            previousLabel="< previous"
            nextLabel="next >"
            breakLabel="..."
            pageCount={101}
            marginPagesDisplayed={3}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
                    />
        </div>
    )
}

export default Restaurants
