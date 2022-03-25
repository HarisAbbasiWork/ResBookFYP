var ObjectId = require('mongodb').ObjectID;

const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const crypto  = require('crypto')
const saltRounds = 10;
var userModel = require('../models/usermodel')
var notificationModel = require('../models/Notifications')
var reviewModel = require('../models/reviewsmodel')
var restaurantModel = require('../models/restaurantmodel')
var jwt = require('jsonwebtoken');
exports.signup = async function(req,res){ 
    var countValue = req.body;
    console.log("CountValue is", countValue);
    const ifuser=await userModel.findOne({ email: countValue.email })
    if(ifuser){
      res.send({
        success: false,
        message:"User Already Exists"
      });
    } 

  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  /* var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "propic":countValue.fileurl,
    "password":hash, 
    "DOB": countValue.DOB,
    "friends":[],
    "sentRequests":[],
    "recievedRequests":[]
    



} 
console.log("HashedPwd: ", hash)
  userModel.create(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
          
});  */
const newUser = await new userModel({
  firstname: countValue.fname, 
  lastname: countValue.lname,
  email:countValue.email, 
  propic:countValue.fileurl,
  password:hash, 
  DOB: countValue.DOB,
  friends:[],
  sentRequests:[],
  recievedRequests:[]
}).save();
if(newUser){
  res.send({
    success: true,
    message:"You are now user"
  });

}else{
  res.send({
    success: false,
    message:"Request Failed"
  });
}
});

      
}
exports.signin = function(req,res){ 
    var countValue = req.body;
    console.log("Body ", countValue);
    console.log("U are ", countValue.email);
    var data = { 
      "email":countValue.email 
      
      } 
      userModel.findOne({ email: countValue.email }, function(err, collection){
    if(err){
        console.log("Invalid User");
        return res.send({
          success: false,
          message: 'User not exists'
        });
    }else{
      
      if (collection!=null){
        console.log("User found");
        bcrypt.compare(countValue.pass, collection.password, function(err, resi) {
          console.log(resi)
        if (resi === true){
          console.log("Correct details found");
          console.log(collection.firstname)
          const id=collection._id
          const token = jwt.sign({id}, "jwtSecret",{
            expiresIn:3000
          });
  
          
  
          return res.send({
            success: true,
            token: token,
            message: 'Correct Details',
            fname: collection.firstname,
            lname: collection.lastname,
            email: collection.email,
            id:collection._id,
            friends:collection.friends,
            propic: collection.propic
          });
        }else{
          return res.send({
            success: false,
            message: 'Error: Email and Pass Dont Match'
          });
         
        }
      });
        
      }else{
        console.log("User not found");
        return res.send({
          success: false,
          message: 'Error: Incorrect User, Recheck Your Email'
        });
      }
    }
     
  });

      
}
exports.signin2 = async function(req,res){ 
  var countValue = req.body;
  console.log("Body ", countValue);
  console.log("U are ", countValue.email);
  const user=await userModel.findOne({ email: countValue.email })
  if(user){
    if(await bcrypt.compare(countValue.pass, user.password)){
      const id=user._id
      const token = jwt.sign({id}, "jwtSecret",{
        expiresIn:3000
      });
      return res.send({
        success: true,
        token: token,
        message: 'Correct Details',
        fname: user.firstname,
        lname: user.lastname,
        email: user.email,
        id:user._id,
        friends:user.friends,
        propic: user.propic
      });


    }else{
      return res.send({
        success: false,
        message: 'Error: Email and Pass Dont Match'
      });
    }

    
  }else{
    console.log("Invalid User");
        return res.send({
          success: false,
          message: 'User not exists'
        });

  }
}
exports.updatesettings = async function(req,res){ 
    var updatedprofile = req.body;
  console.log(req.file.filename)
  console.log("UP for update i recieved in nodejs (Backend)", updatedprofile)
  bcrypt.hash(updatedprofile.password, saltRounds, (err, hash) => {
  var data = {$set:{
    "firstname":updatedprofile.firstname,
    "lastname":updatedprofile.lastname,
    "email":updatedprofile.email,
    "propic":req.file.filename,
    "password":hash
  }}
   userModel.findOneAndUpdate({"email": updatedprofile.oemail},data, function(err, collection){ 
    if (err) throw err; 
    console.log("Profile updated Successfully"); 
    return res.send({
      message: 'Profile updated Successfully'
    });
          
});

});
console.log("ading new propic: ",req.file.filename)

      
}
exports.getuserIDName = function(req,res){ 
    console.log("friend profile email: ", req.body.email)
  userModel.findOne({"email": req.body.email}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

      
}
exports.getuserByEmail = function(req,res){ 
    console.log(req.params.email)
  userModel.findOne({"email": req.params.email}, function(err, details) {
    console.log("user details Found",details)
    res.json(details)
});

      
}
exports.getusers = async function(req,res){ 
    const filter = {};
    const all = await userModel.find(filter);
    res.json(all)

      
}
exports.getuserByID = function(req,res){ 
  let id = req.params.id;
  userModel.findOne({"_id": ObjectId(req.params.id)}, function(err, profile) {
    console.log("profile Found",profile)
    res.json(profile)
});

    
}
 function removeSentRequest(Demail,Recieptemail) {
     userModel.findOne({"email": Demail}, async function(err, creden) {
      console.log("creden Found",creden.sentRequests)
      var UD=creden.sentRequests
      const index = UD.indexOf(Recieptemail);
      if (index > -1) {
        UD.splice(index, 1);
      }
      console.log("updated sentRequests of "+UD)
      const query = {"email": Demail}
      const update = {
        "$set": {
          "sentRequests": UD,
        }
      };
      const updateddoc=await userModel.findOneAndUpdate(query,update)
      console.log("updateddoc",updateddoc)
  });
    
  }
   async function removetofriend(Demail,Recieptemail) {
     await userModel.findOne({"email": Demail}, function(err, creden) {
      console.log("creden Found",creden.friends)
      var UD=creden.friends
      const index = UD.indexOf(Recieptemail);
      if (index > -1) {
        UD.splice(index, 1);
      }
      console.log("updated Friends of "+Demail+" to "+UD)
      creden.friends=UD
      return creden.save()
  
      
  });
    
  }
   async function addtofriend(Demail,Recieptemail) {
     await userModel.findOne({"email": Demail}, function(err, creden) {
      console.log("creden Found",creden.friends)
      var UD=creden.friends
      UD.push(Recieptemail)
      console.log("updated Friends of "+Demail+" to "+UD)
      creden.friends=UD
      return creden.save()
  });
    
  }
   async function addSentRequest(Demail,Recieptemail) {
     await userModel.findOne({"email": Demail}, function(err, creden) {
      console.log("creden Found",creden.sentRequests)
      var UD=creden.sentRequests
      UD.push(Recieptemail)
      console.log("updated favs of "+UD)
      creden.sentRequests=UD
      return creden.save()
  });
    
  }
   async function addRecieveRequest(Demail,Recieptemail) {
     await userModel.findOne({"email": Demail}, function(err, creden) {
      console.log("creden Found",creden.recievedRequests)
      var UD=creden.recievedRequests
      UD.push(Recieptemail)
      console.log("updated favs of "+UD)
      creden.recievedRequests=UD
      return creden.save()
  });
    
  }
   function removeRecieveRequest(Demail,Recieptemail) {
     userModel.findOne({"email": Demail}, async function(err, creden) {
      console.log("creden Found",creden.recievedRequests)
      var UD=creden.recievedRequests
      const index = UD.indexOf(Recieptemail);
      if (index > -1) {
        UD.splice(index, 1);
      }
      console.log("updated recievedRequests of "+UD)
      const query = {"email": Demail}
      const update = {
        "$set": {
          "recievedRequests": UD,
        }
      };
      const updateddoc=await userModel.findOneAndUpdate(query,update)
      console.log("updateddoc",updateddoc)

  });
    
  }
exports.handlefriendbutton = async function(req,res){ 
    console.log(req.body)
    if(req.body.profilestatus==="Recieved Friend"){
      console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" recievedRequests List")
       removeRecieveRequest(req.body.LUemail2,req.body.Pemail)
      console.log("hey backend, you have remove "+req.body.LUemail2+" id from "+req.body.Pemail+" sentRequests List")
       removeSentRequest(req.body.Pemail,req.body.LUemail2)
      console.log("hey backend, you have to add both to eachother friends")
      addtofriend(req.body.LUemail2,req.body.Pemail)
      addtofriend(req.body.Pemail,req.body.LUemail2)
      const LU=await userModel.findOne({"email": req.body.LUemail2});
      const PU=await userModel.findOne({"email": req.body.Pemail});
      const responsee=await notificationModel.deleteOne({ type: 'Request',"sentTo":ObjectId(LU._id),"userid":ObjectId(PU._id) });
      console.log("Notiresponse",responsee)
      var data = { 
        "sentTo": PU._id, 
        "id": LU._id,
        "userid": LU._id,
        "type":"RequestConfirm"
      } 
      notificationModel.create(data,function(err, notification){ 
        if (err) throw err; 
        console.log("notification inserted Successfully"); 
              
    });
      return res.send({
        success: true,
        message: 'Done'
      });
    }
    if(req.body.profilestatus==="Sent Friend"){
      console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" sentRequests List")
      removeSentRequest(req.body.LUemail2,req.body.Pemail)
      console.log("hey backend, you have remove "+req.body.LUemail2+" id from "+req.body.Pemail+" recievedRequests List")
      removeRecieveRequest(req.body.Pemail,req.body.LUemail2)
      const LU=await userModel.findOne({"email": req.body.LUemail2});
      const PU=await userModel.findOne({"email": req.body.Pemail});
      const responsee=await notificationModel.deleteOne({ type: 'Request',"sentTo":ObjectId(PU._id),"userid":ObjectId(LU._id) });
      console.log("Notiresponse",responsee)
      return res.send({
        success: true,
        message: 'Done'
      });
    }
    if(req.body.profilestatus==="Not Anything"){
      console.log("hey backend, you have add "+req.body.Pemail+" id to "+req.body.LUemail2+" sentRequests List")
      addSentRequest(req.body.LUemail2,req.body.Pemail)
      console.log("hey backend, you have add "+req.body.LUemail2+" id to "+req.body.Pemail+" recievedRequests List")
      addRecieveRequest(req.body.Pemail,req.body.LUemail2)
      const LU=await userModel.findOne({"email": req.body.LUemail2});
      const PU=await userModel.findOne({"email": req.body.Pemail});
      var data = { 
        "sentTo": PU._id, 
        "id": LU._id,
        "userid": LU._id,
        "type":"Request"
      } 
      notificationModel.create(data,function(err, notification){ 
        if (err) throw err; 
        console.log("notification inserted Successfully"); 
              
    });
    return res.send({
      success: true,
      message: 'Done'
    });

    }
    if(req.body.profilestatus==="Friend"){
      console.log("hey backend, you have remove "+req.body.Pemail+" id from "+req.body.LUemail2+" friends List vice versa")
      await removetofriend(req.body.LUemail2,req.body.Pemail)
      await removetofriend(req.body.Pemail,req.body.LUemail2)
      return res.send({
        success: true,
        message: 'Done'
      });
    }

      
}
exports.notifications = async function(req,res){ 
  let id = req.params.userid;
  const notifications=await notificationModel.find({"sentTo": ObjectId(req.params.userid)}).populate('userid');
  res.json(notifications.reverse())

    
}
exports.forgetpassword = async function(req, res){
  var countValue = req.body;
  console.log("U are ", countValue.email);
  userModel.findOne({ email: req.body.email })
  .then(user => {
      console.log('user', user)
      if (!user) {
          return res.status(404).json('Email not found!')
      }
      const token = crypto.randomBytes(32).toString('hex');
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      return user.save()
  })
  .then(result => {
      console.log('postfindpassword', result)
      const token = result.resetToken
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      })
      let mailOptions = {
          from: 'JobWeb@gmail.com',
          to: req.body.email,
          subject: 'Reset Password',
          html: `
          <p>Click this <a href="http://localhost:3000/reset/${token}">http://localhost:3000/reset/${token}</a> to set a new password. </p>
      `
      }
      transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
              return console.log('error occurs', err)
          }
          return res.status(201).json('Email sent!')
      })
  })
  .catch(err => {
      console.log(err)
  })


 }
 exports.nextforgetpassword = async function(req, res){
  console.log('req.body', req.body)
  
  const password = req.body.password;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  userModel.findOne({ resetToken: passwordToken })
      .then(user => {
          console.log('user', user)
          resetUser = user;
          return bcrypt.hash(password, saltRounds)
      })
      .then(hashedPassword => {
          resetUser.password = hashedPassword;
          resetUser.resetToken = undefined;
          resetUser.resetTokenExpiration = undefined;
          return resetUser.save()
      })
      .then(() => {
          res.status(201).json({ message: 'password updated' })
      })
      .catch(err => {
          console.log(err)
      })
  

 }
 exports.googlelogin = function(req,res){ 
  console.log(req.body.email)
  userModel.findOne({"email": req.body.email}, function(err, collection) {
    if(collection){

    
    console.log("user details Found",collection)
    
    return res.send({
      success: true,
      message: 'Correct Details',
      fname: collection.firstname,
      lname: collection.lastname,
      email: collection.email,
      id:collection._id,
      friends:collection.friends,
      propic: collection.propic
    });
  }else{
    return res.send(null);

  }
    
});

      
}
exports.additionalsignup = function(req,res){ 
  var countValue = req.body;
  console.log(req.file.filename)
  console.log("CountValue is", countValue.email, countValue.fname, countValue.lname);
  bcrypt.hash(req.body.pass, saltRounds, async (err, hash) => {
  var data = { 
    "firstname": countValue.fname, 
    "lastname": countValue.lname,
    "email":countValue.email, 
    "propic":req.file.filename,
    "password":hash, 
    "DOB": countValue.DOB,
    "friends":[],
    "sentRequests":[],
    "recievedRequests":[]
    



} 
console.log("HashedPwd: ", hash)
  userModel.create(data,function(err, collection){ 
    if (err) throw err; 
    console.log("Record inserted Successfully"); 
    return res.send({
      success: true,
      message: 'Correct Details',
      fname: collection.firstname,
      lname: collection.lastname,
      email: collection.email,
      id:collection._id,
      friends:collection.friends,
      propic: collection.propic
    });
          
}); 
});
      
}
exports.addtofav = function(req,res){ 
  console.log(req.body.resid,req.body.userid)
  userModel.findOne({"_id": ObjectId(req.body.userid)}, function(err, profile) {
    console.log("profile Found",profile)
    profile.favorites.push(req.body.resid)
    return profile.save()
});
return res.send({
  success:true,
  message:"Added to favorites"
})
}
exports.checkinfav = function(req,res){ 
  console.log("Checking if its innfavs",req.body.resid,req.body.userid)
  userModel.findOne({"_id": ObjectId(req.body.userid)}, function(err, profile) {
    console.log("profile Found",profile)
    console.log(profile.favorites.includes(ObjectId(req.body.resid)))
    
    return res.send({
      isexist:profile.favorites.includes(ObjectId(req.body.resid))
    })
    
});

}
exports.removefromfav = function(req,res){ 
  console.log(req.body.resid,req.body.userid)
  userModel.findOne({"_id": ObjectId(req.body.userid)}, function(err, profile) {
    console.log("profile Found",profile)
    var index = profile.favorites.indexOf(req.body.resid);
    if (index !== -1) {
      profile.favorites.splice(index, 1);
    }
    return profile.save()
});
return res.send({
  success:true,
  message:"Added to favorites"
})
}
exports.getfavorites = async function(req,res){ 
  console.log(req.params.userid)
  const userprofile=await userModel.findOne({"_id": ObjectId(req.params.userid)}).populate('favorites')
  console.log(userprofile.favorites)
  return res.send({
    success:true,
    favorites:userprofile.favorites
  })


}