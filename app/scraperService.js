//ECMAScript6 features work in strict mode
"use strict";

//Require x-ray module for scraping content
const xRay = require("x-ray"),
    xray = new xRay();



class ScraperService{

    constructor(options){
        //Options - is an object where specified scraper parameters are
        this.options = options;
    }

    //Function helper which takes a single url, makes a request and returns a promise
    scrapeDataForOneUrl(url){
        return new Promise( (resolve, reject) => {
            xray(url, this.options)( (err, doc) => {

                if(err) reject(err);

                //Resolving the data object in case of success
                resolve(doc);
            })
        });
    }

    //The function returns a promise that resolves when all of the promises in the iterable
    //argument have resolved or rejects with the reason of the first passed promise that rejects
    scrapeDataForMultipleUrls(urls){
        return Promise.all(urls.map(this.scrapeDataForOneUrl.bind(this)));
    }
}

module.exports = ScraperService;