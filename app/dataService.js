"use strict";

//Define DataWorker class for working with the scraped data and representing it in a needed format
class DataService{

    //Method for representing data in common txt format
    edit(data){
        let edited = '';

        //Looping through data array of objects
        for (let obj of data){
            edited += 'Title: ' + '\n' + obj.title + '\n' + 'Content: ' + '\n' + obj.content + '\n\n\n';
        }
        return edited;
    }
}

module.exports = DataService;