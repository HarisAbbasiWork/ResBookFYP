
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var user = new Schema({
    "firstname": String, 
    "lastname": String,
    "email":String, 
    "propic": String,
    "password":String,
    "DOB": String,
    "resetToken": String,
    "resetTokenExpiration": Date,
    "friends":[String],
    "sentRequests":[String],
    "recievedRequests":[String],
    "favorites": [{type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurants'}]
});
module.exports = mongoose.model('details', user);