var express = require('express');
var cors = require('cors');
var path = require("path");
var fs = require('fs');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var RESTAURANT_COLLECTION = "restaurant";
var app = express();

/* let's add the ability to ajax to our server from anywhere! */
app.use(cors());
/* extended:true = put it in an obj */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/* MongoClient lets us interface/connect to mongodb */
var MongoClient = mongodb.MongoClient;
/* Connection url where your mongodb server is running. */
var mongoUrl = 'mongodb://localhost:27017/restaurant_db';

//STARTING CONNECTION TO MONGO DATABASE
mongodb.MongoClient.connect(process.env.MONGODB_URI || mongoUrl, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");
  // Initialize the app. another way to start a server in express
  var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
    console.log("App now running on port", port);
  });
});
//######################################################################
//SET UP ROUTES

//WELCOME PAGE
 app.get('/', function(request, response){
 response.json({"description":"GOOGLEMAPS API"});
 console.log("HOME PAGE");
});

//GET ALL
app.get('/restaurant_db', function(request, response){
  MongoClient.connect(mongoUrl, function (err, db) {
    var restaurantCollection = db.collection('restaurant');
    if (err) {
      console.log('Unable to connect to the mongoDB server. ERROR:', err);
    } else {
      /* Get all */
      restaurantCollection.find().toArray(function (err, result) {
        if (err) {
          console.log("ERROR!", err);
          response.json("error");
        } else if (result.length) {
          console.log('Found:', result);
          response.json(result);
        } else { //
          console.log('No document(s) found with defined "find" criteria');
          response.json("no results found");
        }
        db.close(function() {
          console.log( "database CLOSED");
        });
      }); // end find

    } //ELSE Closing Tag
  }); //MongoClient Closing Tag
}); //APP.GET Closing Tag

//POST
app.post('/restaurant_db', function(request, response){
  // response.json({"description":"add new"});
  console.log("request.body", request.body);

  MongoClient.connect(mongoUrl, function (err, db) {
    var restaurantCollection = db.collection('restaurant');
    if (err) {
      console.log('Unable to connect to the mongoDB server. ERROR:', err);
    } else {
      // We are connected!
      console.log('Connection established to', mongoUrl);
      console.log('Adding new item...');

      /* Insert */
      var newFavorite = request.body;
      restaurantCollection.insert([newFavorite], function (err, result) {
        if (err) {
          console.log(err);
          response.json("error");
        } else {
          console.log('Inserted.');
          console.log('RESULT!!!!', result);
          console.log("end result");
          response.json(result);
        }
        db.close(function() {
          console.log( "database CLOSED");
        });
      }); // end insert

    } // Mongoelseend

  }); // end mongo connect

}); //APP POST Closing
