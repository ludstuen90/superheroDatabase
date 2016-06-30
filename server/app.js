//Establishing necessary parameters for Express server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//Connects Mongo Database via Mongoose
var mongoose = require('mongoose');
var heroModel = require('../models/superheroModels');
mongoose.connect( 'localhost:27017/Heroes');

// Establishes that the localhost base route directs to index.html page in views folder
app.get('/', function(req,res){
  console.log('Base URL Request Received');
  res.sendFile(path.resolve('views/index.html'));
});

// Responsible for adding a hero. Receives paramters in heroReceived object
app.post('/postHero', function(req, res){
var heroReceived = {
  firstName:  req.body.firstName,
  lastName:  req.body.lastName,
  city: req.body.city,
  superPower: req.body.superPower
};

// Saves to database according to the superheroModels.js model
var newHero = heroModel(heroReceived);
newHero.save();
res.send(true);

  console.log(heroReceived);
});

// Requests * from the database, returns to client
app.get('/getHeroes', function(req, res){
  console.log('in get heroes!');
  heroModel.find().then(function(data){
    res.send(data);
  });
});

// Receives information from client to delete.
// I attempted to use the delete function, but I wasn't able to get it to
// work. So, to at least make this functionality, the ID is sent back via a
// post call, and the server deletes from Mongo.
app.post('/deleteHero', function(req, res){
  console.log('delete route');
  console.log( req.body.deleteME);
heroModel.findOne({_id: req.body.deleteME}, function(err, userResult){
if(err){
  console.log(err);
  res.sendStatus(500);
}else{
  heroModel.remove({_id: req.body.deleteME}, function(err){});
  res.sendStatus(200);
}
});
});//


app.listen(4242, function(req, res){
  console.log('Server is now up on port 4242');
});

app.use(express.static('public'));
