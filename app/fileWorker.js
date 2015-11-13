//ECMAScript6 features work in strict mode
"use strict";

//Require file stream module
let fs = require('fs');

//Define the class FileWorker
class FileWorker{

    //Function that writes the file
    write(filename, data){
        return new Promise( (resolve, reject) => {
            fs.writeFile(filename, JSON.stringify(data), (err) => {
                if (err) reject(err);
                resolve("Successfully written to the file!");
            })
        })
    }

    //Function that reads the file
    read(filename){
        return new Promise ((resolve, reject) => {
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }
}

module.exports = FileWorker;
