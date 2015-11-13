//ECMAScript6 features work in strict mode
"use strict";

//Require file stream module
let fs = require('fs');

//Define the class FileWorker
class FileWorker{
    constructor(filename, data){
        this.filename = filename;
        this.data = data;
    }

    //Function that writes the file
    write(){
        let data = this.data;
        return new Promise( (resolve, reject) => {
            fs.writeFile(this.filename, data, (err) => {
                if (err) reject(err);
                //console.log("The file was successfully written!");
                resolve("Success!");
            })
        })
    }

    //Function that reads the file
    read(){
        return new Promise ((resolve, reject) => {
            fs.readFile(this.filename, 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(data);
                //console.log("The file was successfully read!");
            })
        })
    }
}

module.exports = FileWorker;
