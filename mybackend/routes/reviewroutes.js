var express = require('express');
var router = express.Router();
var review_controller = require('../controllers/reviewcontroller');
var jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    const token=req.headers["x-access-token"]
    console.log(req.headers["x-access-token"])
    
    if(!token){
      res.send("Yo, we need a token")
    }else{
      jwt.verify(token,"jwtSecret", (err,decoded)=>{
        if(err){
                console.log("you failed authenticate")
                res.json({auth:false, message:"you failed authenticate" })
        }else{
          req.userId=decoded.id;
          console.log("you authenticated")
          next()
        }
      })
    }
  }
    
    router.get('/getreviews',review_controller.getreviews)
    router.get('/getpreviews/:id',review_controller.getpreviews)
    router.get('/review/:id',review_controller.review)
    router.get('/getrreviews/:placeid',review_controller.getrreviews)
    router.post('/deletereview',review_controller.deletereview)
    router.post('/additem',review_controller.addreview)
    router.post('/increaselikes',review_controller.increaselikes)
    router.post('/increasedislikes',review_controller.increasedislikes)
    router.post('/addcomment',review_controller.addcomment)    
           module.exports = router;
