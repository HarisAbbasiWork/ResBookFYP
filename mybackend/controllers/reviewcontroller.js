
var ObjectId = require('mongodb').ObjectID;

var userModel = require('../models/usermodel')
var reviewModel = require('../models/reviewsmodel')
var restaurantModel = require('../models/restaurantmodel')
var commentModel = require('../models/Comment')
var notificationModel = require('../models/Notifications')
var sentiment = require( 'wink-sentiment' );
exports.getreviews =async function(req,res){ 
    const filter = {};
    const all = await reviewModel.find(filter).populate({
      path:"userid",
      model: "details"
    }).populate({
        path:"comments",
        model: "comments",
        populate: {
          path:"user",
          model: "details"
        }
       });
    console.log(all)
    res.json(all.reverse())

      
}
exports.review =async function(req,res){ 
  const filter = {"_id": ObjectId(req.params.id)};
  console.log(req.params.id)
  const reveiw = await reviewModel.findOne(filter).populate({
    path:"userid",
    model: "details"
  }).populate({
      path:"comments",
      model: "comments",
      populate: {
        path:"user",
        model: "details"
      }
     });
  console.log(reveiw.date.split('/'))
  const yeartime=reveiw.date.split('/')
  console.log(" Month: ",yeartime[0])
  const month=yeartime[0]
  res.json(reveiw)

    
}
exports.getpreviews =async function(req,res){ 
  const filter = {"userid":ObjectId(req.params.id)};
  const all = await reviewModel.find(filter).populate({
    path:"userid",
    model: "details"
  }).populate({
      path:"comments",
      model: "comments",
      populate: {
        path:"user",
        model: "details"
      }
     });
  //console.log(all)
  res.json(all.reverse())

    
}
exports.getrreviews =async function(req,res){ 
  const filter = {"placeid":req.params.placeid};
  const all = await reviewModel.find(filter).populate({
    path:"userid",
    model: "details"
  }).populate({
      path:"comments",
      model: "comments",
      populate: {
        path:"user",
        model: "details"
      }
     });
  console.log(all)
  res.json(all.reverse())

    
}
exports.deletereview =async function(req,res){ 
    console.log("we deleting")
  console.log(req.body.id)
  reviewModel.findOneAndDelete({'_id': ObjectId(req.body.id)}, function(err, obj) {
    if (err) throw err;
    console.log("1 Review deleted");
  });

      
}

exports.addreview =async function(req,res){ 
    var countValue = req.body;
  console.log("Review i recieved in nodejs (Backend)", countValue)
  const sen=sentiment(countValue.review)
  console.log(sen.score)
  var type=null
  switch (sen.score) {
    case (0):
      type = "Neutral";
      break;
    case (-1000 < sen.score &&  sen.score < 0):
      type = "Negative";
      break;
    case (0< sen.score &&  sen.score < 1000):
      type = "Positive";
      break;
  }
  if(sen.score>0){
    console.log("Positive")
    type = "Positive";
  }else if(sen.score<0){
    console.log("Negative")
    type = "Negative";
  }else if(sen.score=0){
    console.log("Neutral")
    type = "Neutral";
  }
  console.log("Type: ", type)
  userModel.findOne({"email": countValue.user}, function(err, creden) {
    var data = { 
      "resname": countValue.resname.name, 
      "placeid": countValue.resname.placeid, 
      "date": countValue.date,
      "rate": countValue.rate,
      "tagrate": countValue.tagrate,
      "ambiencerate": countValue.ambiencerate,
      "tag": countValue.tag,
      "review":countValue.review,
      "userid":creden._id,
      "likes":0,
      "dislikes":0,
      "comments":[],
      "sentiment":type,
      
    } 
    reviewModel.create(data,function(err, collection){ 
      if (err) throw err; 
      console.log("Review inserted Successfully"); 
            
  });
  return res.send({
    success: true,
    message: 'Review Posted Successfully'
  });
    
});
  
 

      
}
exports.increaselikes = function(req,res){ 
    console.log("POstID: ", req.body.postid, req.body.likedby)
  reviewModel.findOne({'_id': ObjectId(req.body.postid)}, async function(err, creden) {
    console.log("updating user total likes",creden.likes)
    if(creden.likedBy.includes(req.body.likedby)){
      console.log("it's already liked by ", req.body.likedby)
      const index = creden.likedBy.indexOf(req.body.likedby);
      if (index > -1) {
        creden.likedBy.splice(index, 1);
        creden.likes=creden.likes-1
      }
      creden.save()
      return res.send({
        success:true,
        message:"UnLiked"
      })
    }else{
      creden.likes=creden.likes+1
      creden.likedBy.push(req.body.likedby)
      const LU=await userModel.findOne({"email": req.body.likedby});
      var data = { 
        "sentTo": creden.userid, 
        "id": req.body.postid,
        "userid": LU._id,
        "type":"Post"
      } 
      notificationModel.create(data,function(err, notification){ 
        if (err) throw err; 
        console.log("notification inserted Successfully"); 
              
      });

      creden.save()
      return res.send({
        success:true,
        message:"Liked"
      })

    }
    
});


 

      
}
exports.increasedislikes =async function(req,res){ 
    console.log("POstID: ", req.body.postid, "Disliked by: ", req.body.dislikedby)
    reviewModel.findOne({'_id': ObjectId(req.body.postid)}, function(err, creden) {
      console.log("updating user total likes",creden.dislikes)
      if(creden.dislikedBy.includes(req.body.dislikedby)){
        console.log("it's already disliked by ", req.body.dislikedby)
        const index = creden.dislikedBy.indexOf(req.body.dislikedby);
        if (index > -1) {
          creden.dislikedBy.splice(index, 1);
          creden.dislikes=creden.dislikes-1
        }
      creden.save()
      return res.send({
        success:true,
        message:"UnDisLiked"
      })
        
      }else{
        creden.dislikes=creden.dislikes+1
        creden.dislikedBy.push(req.body.dislikedby)
        creden.save()
        return res.send({
          success:true
        })
  
      }
      
  });
  
 

      
}
exports.addcomment =async function(req,res){ 
  console.log("POstID: ", req.body.postid, "Comment by: ", req.body.userid, " Comment", req.body.comment)
  var data = { 
    "user": req.body.userid, 
    "review": req.body.postid, 
    "text": req.body.comment
    
  } 
  await commentModel.create(data, async function(err, collection){ 
    if (err) throw err; 
    await reviewModel.findOne({"_id": ObjectId(req.body.postid)}, async function(err, review) {
      console.log("review Found",review)
      review.comments.push(collection._id)
      return await review.save()
    });
    console.log("Comment inserted Successfully"); 
    console.log("okay send response")
    return res.send({
      success:true,
      postid:req.body.postid
    })
          
});

  




    
}