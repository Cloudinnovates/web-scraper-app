"use strict";
let xRay = require("x-ray");

let xray = new xRay();

let urls = [
    "http://cad.edu.kpi.ua/petrenko/nove/",
    "http://cad.edu.kpi.ua/petrenko/doslidnicka-robota/",
"http://cad.edu.kpi.ua/petrenko/naukova-robota/",
    "http://cad.edu.kpi.ua/petrenko/metodichna-robota-2/",
        "http://cad.edu.kpi.ua/petrenko/premiї/",
            "http://cad.edu.kpi.ua/rogoza/doslidnicka-robota/",
                "http://cad.edu.kpi.ua/rogoza/metodichna-robota/",
                    "http://cad.edu.kpi.ua/rogoza/insha-diyalnist/",
                        "http://cad.edu.kpi.ua/rogoza/vixovna-robota/",
                            "http://cad.edu.kpi.ua/britov/naukova-diyalnist/",
                                "http://cad.edu.kpi.ua/stikanov/vidpochinok/",
                                    "http://cad.edu.kpi.ua/stikanov/naukova-diyalnist/",
                                        "http://cad.edu.kpi.ua/bulakh/biografiya/",
                                            "http://cad.edu.kpi.ua/bulakh/metodichna-robota/",
                                                "http://cad.edu.kpi.ua/bulakh/naukova-diyalnist/",
                                                    "http://cad.edu.kpi.ua/bulakh/novini/",
                                                        "http://cad.edu.kpi.ua/tsoorin/2012/03/21/diplomni-roboti/",
                                                            "http://cad.edu.kpi.ua/tsoorin/2012/02/10/ekskurs-v-minule/",
                                                                "http://cad.edu.kpi.ua/tsoorin/2011/06/16/vikonannya-dodatkovix-robit/",
                                                                    "http://cad.edu.kpi.ua/tsoorin/2011/05/16/naukovi-interesi/",
                                                                        "http://cad.edu.kpi.ua/tsoorin/2011/05/16/moї-predmeti/"
];



let options = {
    title: 'title',
    logo: '.bns-logo img@src, .post img@src',
    content : ['.entry-content p, .entry p, #content p, .art-postcontent p']
};

function scrapeDataForOneUrl(url, options){
    return new Promise(function (resolve, reject) {
        xray(url, options)(function (err, doc) {
            if(err){reject(err)}
        })
    });
}
function scrapeData(urls, options){
    return new Promise(function (resolve, reject) {
        let data = [];

        for (let url of urls){
            xray(url, options)(function (error, doc) {
                if(error){
                    reject('Something wend wrong!' + error);
                }
                data.push(doc);
            })
        }
        resolve(data);
    })
}

scrapeData(["http://google.com", "http://google.com"], 'title').then(function (data) {
    console.log(data);
}, function (error) {
    console.log(error);
});

