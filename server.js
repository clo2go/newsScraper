var express = require('express');
var app = express();
var mongoose = require('mongoose');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.engine('handlebars', exphbs({
  defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/controller.js');
app.use('/', routes);

mongoose.connect("mongodb://heroku_pfkzfmn9:uc6mpcpsbd8ad1vmqorj4g35eb@ds127948.mlab.com:27948/heroku_pfkzfmn9");
var db = mongoose.connection;

db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('App running on port: ' + PORT);
});
