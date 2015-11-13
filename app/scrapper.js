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

function write(){

    let data = [];

    for(let url of urls){
        xray(url, {
            title: 'title',
            logo: '.bns-logo img@src',
            content1: ['.entry-content p'],
            content2: ['.entry p'],
            content3: ['#content p'],
            content4: ['.art-postcontent p']
        })(function (err, doc) {

            if(err) throw err;

            console.log(doc);

        })
    }

}

function processData(doc){
    for (let property in doc){

        if (!doc.property){
            delete !doc.property
        }
    }
}
write();
