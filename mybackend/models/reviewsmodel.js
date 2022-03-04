var mongoose = require('mongoose');

var Schema = mongoose.Schema;
 var review = new Schema({
    "resname": String,
    "placeid":String, 
    "date":String,
    "rate":Number,
    "tagrate":Number,
    "ambiencerate":Number,
    "tag": String,
    "review": String,
    "userid": {type: mongoose.Schema.Types.ObjectId,
        ref: 'details'},
    "likes":Number,
    "sentiment":String,
    "likedBy":[String],
    "dislikedBy":[String],
    "dislikes": Number,
    "comments": [{type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'}]
});
module.exports = mongoose.model('reviews', review);