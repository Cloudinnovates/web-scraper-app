//BASE SETUP
"use strict";

const config = require('./config'),
    ScraperService = require('./app/scraperService'),
    express = require('express'),
    morgan = require('morgan'),
    FileService = require('./app/fileService'),
    bodyParser = require('body-parser'),
    DataService = require('./app/dataService'),
    path = require('path');


//Initialize the app and needed modules
const app = express(),

    fileService = new FileService(),
    scraperService = new ScraperService(config.options),
    dataService = new DataService();


//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

//Log all requests to the console
app.use(morgan('dev'));


//Set static files location
//Used for requests that our front end will make
app.use(express.static(__dirname  + '/public'));

//Used for serving static bower_components
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

//Scraper processing route
app.post('/process', (req, res) => {

    //Data from client - set of urls
    let urls = req.body;

    scraperService.scrapeDataForMultipleUrls(urls)
        .then((data) => {
           return fileService.write(config.filename, dataService.edit(data));
        }).then(
            (message) => {
                res.json({
                    success: true,
                    message: message
                })},
            (error) => {
                res.json({
                    success: false,
                    error: error
                });
            }
        )
});

//Scraper downloading route
app.get('/download', (req, res) => {

    let fileStream = fileService.createFileStream(config.filename);

    fileStream.on('error', (err) => {
        //Error handling
        res.json({
            success: false,
            message: err
        });
    });

    fileStream.pipe(res);

});

//Main route
//Send our users to front-end
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'index.html'))
});

//START THE SERVER
app.listen(config.port);
console.log('The server is running on port ' + config.port);

