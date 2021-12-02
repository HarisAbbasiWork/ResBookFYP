var ObjectId = require('mongodb').ObjectID;
const axios = require('axios')
require('dotenv').config()
var userModel = require('../models/usermodel')
var reviewModel = require('../models/reviewsmodel')
var restaurantModel = require('../models/restaurantmodel')
var _ = require('lodash');
exports.restaurantexists =async function(req,res){ 
    var countValue = req.body;
  console.log("Restaurant i recieved in nodejs (Backend)", countValue)
  var ifexist =await restaurantModel.find({"placeid": countValue.placeid}).count()
  console.log(ifexist)
  var restaurant ={
    name:countValue.name,
    address:countValue.address,
    placeid:countValue.placeid,
    ratings:[]
  }
  if(ifexist<1){
    console.log("It doesn't exists")
    restaurantModel.create(restaurant,function(err, collection){ 
      if (err) throw err; 
      console.log("Restaurant inserted Successfully"); 
            
  });

  }else{
    console.log("restaurant already exists")
  }
  return res.send({
    success:true
  })
      
}
exports.getRestaurant = function(req,res){ 
    let placeid = req.params.placeid;
  
    restaurantModel.findOne({"placeid": req.params.placeid}, async function(err, resprofile) {
      console.log("restaurant profile Found",resprofile)
      const {data} = await axios.get(
        //https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&type=restaurant&key=${${process.env.GOOGLEAPIKEY}}
        //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7195361,73.0529528&radius=200&type=restaurant&key=${process.env.GOOGLEAPIKEY}
     `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.placeid}&fields=name%2Crating%2Cgeometry%2Cphotos%2Cuser_ratings_total&key=${process.env.GOOGLEAPIKEY}`
        )
        console.log(data)
      res.json({resprofile,data})
  });
  


      
}
exports.getSumRatings = async function(req,res){ 
  let placeid = req.params.placeid;
  let useremail = req.params.usermail;
  console.log(placeid,useremail)
  var user=await userModel.findOne({email: useremail})
  const allresreviews=await reviewModel.find({"placeid": req.params.placeid}).populate('userid')
  console.log("All restaurant reviews",allresreviews)
    const average = _.meanBy(allresreviews, (p) => parseFloat(p.rate));
    console.log("Gen",average)
    if(user){
      console.log("Friends: ",user.friends)
      const friendsratings=allresreviews.filter(review=>user.friends.includes(review.userid.email))
      const average2 = _.meanBy(friendsratings, (p) => parseFloat(p.rate));
      console.log("Per",average2)
      var obj={
        generalizedrating:average,
        personalizedrating:average2
      }
    return res.send(obj)
  }else{

    var obj={
      generalizedrating:average
    }
    return res.send(obj)

  }

    
}
exports.getTags = async function(req,res){ 
  let placeid = req.params.placeid;
  console.log(req.params.placeid)
  var besttag,worsttag,message
  await reviewModel.aggregate([
    { $match: { placeid: req.params.placeid } },
    { $group: { _id: "$tag", avgrating: { $avg: "$rate" } } },
    { $sort : { avgrating : -1 }}
 ]).then(async (result) => {
  console.log(result)
  if(result[0].avgrating>6){
    console.log("Best tag: ",result[0]._id)
    besttag=result[0]._id

  }else{
    console.log("Looks like all tried tags have bad rating of less than 6")
    console.log("This reataurant tags does get bad reviews")
    besttag=null
    message="No Tag has average good rating of more than 6"
  }
  const lastindex=result.length-1
  if(result[lastindex].avgrating<=6){
    console.log("Worst tag: ",result[0]._id)
    worsttag=result[0]._id
  }else{
    console.log("Looks like all all tried tags have better rating of +6")
    console.log("This reataurant doesn't get bad reviews")
    worsttag=null
    message="No Tag has average bad rating of less than 6"
  }
 })
 return res.send({
   besttag,worsttag,message
 })
    
}
exports.trendingRestaurants = async function(req,res){ 
  await reviewModel.aggregate([
    { $group: { _id: "$placeid", myCount: { $sum: 1 } } },
    {$limit: 10},
    {$lookup:
     {
       from: "restaurants",
       localField: "_id",
       foreignField: "placeid",
       as: "inventory_docs"
     }},
    { $sort : { myCount : -1 }}
 ]).then(async (result) => {
  
    const filter = {};
    const all = await reviewModel.find(filter);

    var months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    var series=[{name:"January", data:[]},{name:"February", data:[]},{name:"March", data:[]},{name:"April", data:[]},{name:"May", data:[]},{name:"June", data:[]},{name:"July", data:[]},{name:"August", data:[]},{name:"September", data:[]},{name:"October", data:[]},{name:"November", data:[]},{name:"December", data:[]}]
    result.forEach((topres) => {
      //console.log("Topresnames: ", topres.inventory_docs[0].name)
      months.forEach((month,index) => {
        //console.log("Month: ", month," index: ",index+1)
        var count=0
        all.forEach(reveiw => {
          //console.log(reveiw.date.split('/'))
          const yeartime=reveiw.date.split('/')
          //console.log(" Month: ",yeartime[0])
          //const month=yeartime[0]
          //console.log(" Resname: ",reveiw.resname)
          if(yeartime[0]==index+1&&reveiw.resname==topres.inventory_docs[0].name){
          console.log(" we comparing: ",yeartime[0]," With ",index+1," and ",reveiw.resname," with ",topres.inventory_docs[0].name)
          }
          if(yeartime[0]==index+1&&reveiw.resname==topres.inventory_docs[0].name){
            count=count+1
            
              console.log("Lets increase count in x: ",topres.inventory_docs[0].name," Series month: ",month)
            
          }
        });
        series[index].data.push({
          x:topres.inventory_docs[0].name,
          y:count
        })
      });
    });
    res.json({result,series})
  })

    
}
exports.resByTags = async function(req,res){ 
  
  await reviewModel.aggregate([
    { $match : { tag : req.params.tag } },
    { $group: { _id: "$placeid", myCount: { $sum: 1 } } },
    {$limit: 10},
    {$lookup:
     {
       from: "restaurants",
       localField: "_id",
       foreignField: "placeid",
       as: "restaurant_doc"
     }},
    { $sort : { myCount : -1 }}
 ]).then(async (result) => {
   console.log(result)
  res.json(result)
 })
}
exports.allRestaurants = async function(req,res){ 
  console.log(req.params.pagenumber)
  var pageNumber=req.params.pagenumber
  const all = await restaurantModel.find()
             .sort( { _id: 1 } )
             .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * 15 ) : 0 )
             .limit(15)
  console.log(all.length)
  res.json(all)           
}
exports.NearbyRestaurants = async function(req,res){ 
  console.log("latitude: ", req.params.latitude," longitude: ", req.params.longitude)
    const {data} = await axios.get(
      //https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&type=restaurant&key=${${process.env.GOOGLEAPIKEY}}
      //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7195361,73.0529528&radius=200&type=restaurant&key=${process.env.GOOGLEAPIKEY}
   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.params.latitude},${req.params.longitude}&radius=700&type=restaurant&key=AIzaSyCpYoojDkdgcjj-P8bBP0fQ-Fau-UPdYCc`
      )
      console.log(data.results.length)
      console.log(data.next_page_token)
      token2=data.next_page_token
      var i=1;
      data.results.forEach(element => {
        console.log(element.name)
       {/*}
       db.collection('restaurants').findOne({"placeid": element.place_id}, function(err, creden) {
         
         if(creden==null){
           console.log("No Restaurant by that id")
           console.log(element.name+' '+i)
           var data = { 
             "name": element.name,
             "address": element.vicinity,
             "placeid": element.place_id,
             "ratings":[]
             
             
           } 
           db.collection('restaurants').insertOne(data)
           console.log("Record Inserted")
         }else{
           console.log("Restaurant already exists"+i)
         }
         if(i==20){
           excutenextquery(token2)
         }
         i++
   
     
       })
     */}
       
      });
      res.json(data)       
}