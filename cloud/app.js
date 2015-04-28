var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require('method-override');

var port = process.env.PORT || 8080;

console.log(process.argv);

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json());         
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


// routes ==================================================
require('./routes')(app); // configure our routes

// start app ===============================================

app.listen(port);										// startup our app at http://localhost:8080
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 
