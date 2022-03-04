import React,{useEffect,useState} from 'react'
import "./loginn.css";
import axios from 'axios'
function ProfileFavorites({id}) {
    const [restaurants, setRestaurants]=useState([])
    const getRestaurants = () => {
        axios.get('http://localhost:5000/getfavorites/'+id)
            .then(response => {
              console.log(response.data)
              setRestaurants(response.data.favorites)
                
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
    <div>
        {restaurants.map(restaurant=>(
            <div style={{marginTop:'1%'}}>
            <div class="jumbo2" href={'/restaurant/'+restaurant.placeid}>
                <a class="title2">{restaurant.name}</a>
            </div></div>
            ))}
    </div>
  )
}

export default ProfileFavorites