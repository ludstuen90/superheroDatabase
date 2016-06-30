//Establishing necessary parameters for Express server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Connects Mongo Database via Mongoose
var mongoose = require('mongoose');
mongoose.connect( 'localhost:27017/Heroes');

app.get('/', function(req,res){
  console.log('Base URL Request Received');
  res.sendFile(path.resolve('views/index.html'));
});

app.listen(3000, function(req, res){
  console.log('Server is now up on port 3000');
});

app.use(express.static('public'));
