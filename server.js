var express = require('express');
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request');
var logger = require('morgan');
// Require request and cheerio. This makes the scraping possible
var request = require('request');
var cheerio = require('cheerio');
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require('bluebird');

mongoose.Promise = Promise;

//Initialize Express
var app = express();

//body-parse standard code
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Set the app up with morgan, body-parser, and a static folder
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));

//Initialize HDBS engine
app.engine('handlebars', exphbs({
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/controller.js');
app.use('/', routes);

var databaseUri = 'mongodb://localhost/scraper';

// Database configuration with mongoose
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI)
} else {
	mongoose.connect('databaseUri')
}

var db = mongoose.connection

// Show any mongoose errors
db.on('error', function(error) {
  console.log('Mongoose Dont give an F: ', error);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose finally gave an F.');
});


var PORT = process.env.PORT || 3000 ;
app.listen(PORT, function() {
  console.log('App going HARD AF on: ' + PORT);
});
