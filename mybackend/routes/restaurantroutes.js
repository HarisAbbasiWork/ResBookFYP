var express = require('express');
var router = express.Router();
var restaurant_controller = require('../controllers/restaurantcontroller');

 
    
    router.post('/restaurantexists',restaurant_controller.restaurantexists)
    router.get('/restaurant/:placeid',restaurant_controller.getRestaurant)
    router.get('/getSumRatings/:placeid/:usermail',restaurant_controller.getSumRatings)
    router.get('/getTags/:placeid',restaurant_controller.getTags)
    router.get('/trendingRestaurants',restaurant_controller.trendingRestaurants) 
    router.get('/resByTags/:tag',restaurant_controller.resByTags)
    router.get('/NearbyRestaurants/:latitude/:longitude',restaurant_controller.NearbyRestaurants)
    router.get('/allrestaurants/:pagenumber',restaurant_controller.allRestaurants)       
           module.exports = router;
