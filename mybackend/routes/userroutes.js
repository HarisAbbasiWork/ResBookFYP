var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/usercontroller');
const multer = require('multer')
var jwt = require('jsonwebtoken');
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../myfrontend/public/content')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file');
const verifyToken=(req,res,next)=>{
  const token=req.headers["x-access-token"]
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

 
    
    router.post('/sign-up',user_controller.signup)
    router.post('/sign-in',user_controller.signin)
    router.post('/sign-in2',user_controller.signin2)
    router.post('/updatesetting',upload,user_controller.updatesettings)
    router.post('/getuserIDName',user_controller.getuserIDName)
    router.get('/changeaccountsetting/:email',user_controller.getuserByEmail)
    router.get('/user/:id',user_controller.getuserByID)
    router.get('/getusers',user_controller.getusers)
    router.post('/handlefriendbutton',user_controller.handlefriendbutton)
    router.get('/notifications/:userid',user_controller.notifications)
    router.post('/forgetpassword', user_controller.forgetpassword)
    router.post('/nextforgetpassword', user_controller.nextforgetpassword)
    router.post('/googlesign-in',user_controller.googlelogin)
    router.post('/additionalsign-up',upload,user_controller.additionalsignup)
    router.post('/addtofav',user_controller.addtofav)
    router.post('/checkinfav',user_controller.checkinfav)
    router.post('/removefromfav',user_controller.removefromfav)
    router.get('/getfavorites/:userid',user_controller.getfavorites)
           module.exports = router;
