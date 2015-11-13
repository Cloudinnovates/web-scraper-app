//BASE SETUP
"use strict";

let config = require('./config'),
    Scrapper = require('./app/scrapper'),
    express = require('express'),
    morgan = require('morgan'),
    fs = require('fs');



//Initialize the app
let app = express();


//APP CONFIGURATION




let scraper = new Scrapper(['http://google.com','http://google.com'], 'title');
let docs  = [];

scraper.scrapeData().then(function (data) {
    docs = data;
    console.log(docs);
}, function (err) {
    console.log(err);
});

//Log all requests to the console
app.use(morgan('dev'));

//Set static files location
//Used for requests that our front end will make
app.use(express.static(__dirname  + '/public'));

//Scrapper route
app.get('/run', (req, res) => {
   res.send(docs);
});

//Main route
//Send our users to front-end
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'public/app/index.html'))
});


//START THE SERVER
app.listen(config.port);
console.log('The server is running on port ' + config.port);

