//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);

const express = require('express')
const axios = require('axios')
const app = express()
const port = 5000
require('dotenv').config()
const key = process.env.GOOGLEAPIKEY
var ObjectId = require('mongodb').ObjectID;
const db = require('./config/dbconfig.js')
var reviewModel = require('./models/reviewsmodel')
var restaurantModel = require('./models/restaurantmodel')
/*app.get('/checkduplicates', async (req, res, next) => {
  db.collection('restaurants').aggregate([
    {
      $group:
       {
         _id: { placeid: "$placeid" },
         count: { $sum:1 }
      }
    },
    {
      $match:
        {
          count: {"$gt": 1}
        }
    }
   ], function (err, results) {
    console.log(results)
     
  })
  

})*/
app.get('/restaurants', async (req, res, next) => {
  var token2;
 try {
   console.log(process.env.GOOGLEAPIKEY)
   const neighborhood = 'chelsea'
   const borough = 'manhattan'
   const address = 'English+Tea+House+F-7/2+F+7/2+F-7,+Islamabad,+Islamabad+Capital+Territory,+Pakistan'
   const {data} = await axios.get(
   //https://maps.googleapis.com/maps/api/place/textsearch/json?query=${address}&type=restaurant&key=${${process.env.GOOGLEAPIKEY}}
   //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.7195361,73.0529528&radius=200&type=restaurant&key=${process.env.GOOGLEAPIKEY}
`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.682942,73.0051052&radius=1000&type=car_repair&key=${process.env.GOOGLEAPIKEY}`
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
   console.log("Done With commands")
   console.log(token2)
   

   } 
 catch (err) {
  next(err)
}

})
async function  excutenextquery(token) {
  try {
    console.log("got token",token)
    const {data2} = await axios.get(
      
   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.6973781,73.0103748&radius=400&type=restaurant&key=${process.env.GOOGLEAPIKEY}&pagetoken=${token}`
      )
      if(data2){
        console.log(data2.results.length)
      }else{
        console.log("Got no result")
      }
  
  }
  catch (err){
    next(err)
  }

}
app.get('/tags/:placeid', async (req, res) => {
  console.log(req.params.placeid)
  await reviewModel.aggregate([
    { $match: { placeid: req.params.placeid } },
    { $group: { _id: "$tag", avgrating: { $avg: "$rate" } } },
    { $sort : { avgrating : -1 }}
 ]).then(async (result) => {
  console.log(result)
  if(result[0].avgrating>6){
    console.log("Best tag: ",result[0]._id)

  }else{
    console.log("Looks like all tried tags have bad rating of less than 6")
    console.log("This reataurant tags does get bad reviews")
  }
  const lastindex=result.length-1
  if(result[lastindex].avgrating<=6){
    console.log("Worst tag: ",result[0]._id)
  }else{
    console.log("Looks like all all tried tags have better rating of +6")
    console.log("This reataurant doesn't get bad reviews")
  }
 })
})

app.get('/trending', async (req, res) => {
  await reviewModel.aggregate([
    { $match : { tag : "Chinese" } },
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
})
app.get('/datealgo', async (req, res) => {
  const filter = {};
    const all = await reviewModel.find(filter);

    var months=["January","February","March","April","May","June","July","August","September","October","November","December"]
    var series=[{name:"January", data:[]},{name:"February", data:[]},{name:"March", data:[]},{name:"April", data:[]},{name:"May", data:[]},{name:"June", data:[]},{name:"July", data:[]},{name:"August", data:[]},{name:"September", data:[]},{name:"October", data:[]},{name:"November", data:[]},{name:"December", data:[]}]
    await reviewModel.aggregate([
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
    result.forEach((topres) => {
      //console.log("Topresnames: ", topres.restaurant_doc[0].name)
      months.forEach((month,index) => {
        //console.log("Month: ", month," index: ",index+1)
        var count=0
        all.forEach(reveiw => {
          //console.log(reveiw.date.split('/'))
          const yeartime=reveiw.date.split('/')
          //console.log(" Month: ",yeartime[0])
          //const month=yeartime[0]
          //console.log(" Resname: ",reveiw.resname)
          if(yeartime[0]==index+1&&reveiw.resname==topres.restaurant_doc[0].name){
          console.log(" we comparing: ",yeartime[0]," With ",index+1," and ",reveiw.resname," with ",topres.restaurant_doc[0].name)
          }
          if(yeartime[0]==index+1&&reveiw.resname==topres.restaurant_doc[0].name){
            count=count+1
            
              console.log("Lets increase count in x: ",topres.restaurant_doc[0].name," Series month: ",month)
            
          }
        });
        series[index].data.push({
          x:topres.restaurant_doc[0].name,
          y:count
        })
      });
    });
   })
    /* all.forEach(reveiw => {
      console.log(reveiw.date.split('/'))
      const yeartime=reveiw.date.split('/')
      console.log(" Month: ",yeartime[0])
      const month=yeartime[0]
      console.log(" Resname: ",reveiw.resname)
    });
    months.forEach((month,index) => {
      console.log("Month: ", month," index: ",index+1)

    }); 
    series[0].name="January"
    series[0].data=[{x: "Ginyaki",y: 1}]*/
    res.json(series)
   
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })