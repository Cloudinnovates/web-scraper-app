"use strict";
//NEEDED DEPENDENCIES
const config = require('./config'),
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create(),
    wiredep = require('wiredep').stream,
    chalk = require('chalk');


//GULP CONFIGURATION
//Directories and files
const index = './public/index.html',
    server = 'server.js',
    client = './public',
    port = config.port;

//Logging messages
function log(message){
    console.log(chalk.white.bold.bgBlue(message));
}


//***********GULP TASKS**************

//RESTART SERVER
gulp.task("start-server", ['inject-bower'], () => {
    let options = {
        script: server,
        delayTime: 1,
        env: {
            PORT: port,
            'NODE_ENV': "development",
            watch: server
        }
    };

    log("***STARTING NODE SEVER***");
    return nodemon(options);
});

//BROWSER SYNCHRONIZATION. RELOAD BROWSER.
gulp.task("reload", () => {

});


//INJECT BOWER LIBRARIES TASK
gulp.task('inject-bower', () => {
    log("***INJECTING BOWER LIBRARIES***");
    let options = {};
    return gulp
        .src(index)
        .pipe(wiredep(options))
        .pipe(gulp.dest(client));
});
