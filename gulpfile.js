"use strict";
//NEEDED DEPENDENCIES
let config = require('./config'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    wiredep = require('wiredep').stream;


//GULP CONFIGURATION
//Directories and files
let index = './public/index.html',
    server = 'server.js',
    client = './public';




//***********GULP TASKS**************

//RESTART SERVER
gulp.task("start", () => {
    nodemon({
        script: server,
        ext: 'js html',
        env: { 'NODE_ENV': 'development' }
    })
});

//RELOAD BROWSER
gulp.task("reload", () => {
    let reload = browserSync.reload;
    reload();
});

//INJECT BOWER LIBRARIES TASK
gulp.task('inject-bower', () => {

    let options = {};

    console.log("Works...");

    return gulp
        .src(index)
        .pipe(wiredep(options))
        .pipe(gulp.dest(client));
});
