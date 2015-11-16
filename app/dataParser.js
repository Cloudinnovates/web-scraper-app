"use strict";

class DataParser{

    //Method for parsing the data and representing it in common txt format
    parse(data){
        let parsed = '';

        //Looping through data array of objects
        for (let obj of data){
            parsed += 'Title: ' + '\n' + obj.title + '\n' + 'Content: ' + '\n' + obj.content + '\n\n\n';
        }
        return parsed;
    }
}

module.exports = DataParser;