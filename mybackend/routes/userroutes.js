var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/usercontroller');
const multer = require('multer')
 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../myfrontend/public/content')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file');
 
    
    router.post('/sign-up',user_controller.signup)
    router.post('/sign-in',user_controller.signin)
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
           module.exports = router;
