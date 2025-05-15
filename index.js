const express = require('express');

const app = express();
const user = require('./routes/user');

app.use(express.json());

app.use('/api/v1',user);
const dbConnect = require('./config/database');

dbConnect();

app.listen(3000 , ()=>{
  console.log('Server is running on this port');
})