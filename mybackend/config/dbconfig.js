import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const mongoose = require('mongoose'); 
 
 mongoose.Promise = global.Promise;
 require('dotenv').config()
 mongoose.connect('mongodb+srv://${process.env.user}:${process.env.PASS}@cluster0.9zwax.mongodb.net/myFirstDatabase?retryWrites=true/ResBook', {
  dbName: process.env.DB_NAME,
  user: process.env.USER,
  pass: process.env.PASS,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
 }, function (err) {
 
  if (err) throw err;
  
  console.log('Successfully connected');
  
  });
 //mongoose.connect('mongodb://localhost:27017/Jobweb', function (err) {
 
  //  if (err) throw err;
  
  //  console.log('Successfully connected');
  
 //});
 var db=mongoose.connection;
 export default db