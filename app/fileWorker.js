//ECMAScript6 features work in strict mode
"use strict";

//Require file stream module
let fs = require('fs');

//Define the class FileWorker
class FileWorker{

    //Function that writes the data to the file
    write(filename, data){
        return new Promise( (resolve, reject) => {
            fs.writeFile(filename, data, (err) => {
                if (err) reject(err);
                resolve("Successfully written to the file!");
            })
        })
    }

    //Function that reads the data from the file
    read(filename){
        return new Promise ((resolve, reject) => {
            fs.readFile(filename, 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(data);
            })
        })
    }

    //Function that creates and returns FileStream
    createFileStream(filename){
        return fs.createReadStream(filename, {bufferSize: 64 * 1024});
    }
}

module.exports = FileWorker;
