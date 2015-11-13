//ECMAScript6 features work in strict mode
"use strict";

//Require x-ray module for scraping content
let xRay = require("x-ray"),
    xray = new xRay(); //Getting an instance of the module


//Defining the class Scraper
class Scraper{

    //Implementing main method for scraping data
    scrapeData(urls, options){

        //Function helper which takes a single url, makes a request and returns a promise
        function scrapeDataForOneUr(url){
            return new Promise( (resolve, reject) => {
                xray(url, options)( (err, doc) => {

                    if(err) reject(err);

                    //Resolving the data object in case of success
                    resolve(doc);
                })
            });
        }

        //The function returns a promise that resolves when all of the promises in the iterable
        //argument have resolved or rejects with the reason of the first passed promise that rejects
        return Promise.all(urls.map(scrapeDataForOneUr));
    }
}

module.exports = Scraper;