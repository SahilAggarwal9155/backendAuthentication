const mongoose = require('mongoose');

require('dotenv').config();
const dbConnect = ()=>{
  mongoose.connect(process.env.mongodb_url).then(()=>{console.log('db is connected successfully')}).catch((err)=>console.log('There is error in connecting databse'));
}

module.exports = dbConnect;