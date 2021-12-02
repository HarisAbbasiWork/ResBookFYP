
const express = require('express')
var request =require('request')
const app = express()
require('dotenv').config()


var bodyParser = require('body-parser')
const port = 5000
var cors = require('cors')
app.use(cors())

 const db = require('./config/dbconfig.js')
 exports.db
app.use(bodyParser.urlencoded({ extended: false }))


var ObjectId = require('mongodb').ObjectID;
// parse application/json
app.use(bodyParser.json())
var reviewroutes1 = require('./routes/reviewroutes');
var userroutes1 = require('./routes/userroutes');
var restaurantroutes1 = require('./routes/restaurantroutes');
app.use(reviewroutes1);
app.use(userroutes1);
app.use(restaurantroutes1)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})