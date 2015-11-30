"use strict";
//<=====NEEDED DEPENDENCIES=====>
const port = require('./config').port || process.env.PORT,
    gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync'),
    wiredep = require('wiredep').stream,
    chalk = require('chalk'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel');




//<=====GULP CONFIGURATION=====>
//Directories and files
const config = {
    index: './public/index.html',
    server: './server.js',
    client: './public',
    gulpfile: './gulpfile.js',
    app: '/app/',
    all: '/**/*.*',
    angular: [
        'public/app/app.module.js',
        'public/app/app.controller.js',
        'public/app/scraper/scraper.module.js',
        'public/app/scraper/scraper.controller.js',
        'public/app/scraper/scraper.service.js'
    ]
};

//Logger functions for messages and errors
function log(message){
    console.log(chalk.white.bold.bgBlue(message));
}
function logError(message){
    console.log(chalk.white.bold.bgRed(message));
}



//*********GULP TASKS**************

//<=====INJECTING BOWER LIBRARIES=====>
gulp.task('inject-bower', () => {
    log("***INJECTING BOWER LIBRARIES***");
    let options = {};
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(gulp.dest(config.client))
        .pipe(browserSync.stream());
});


//<===== RESTARTING SERVER =====>
gulp.task("nodemon", (cb) => {

    // We use this `started` variable to make sure the callback is only executed once
    let started = false,

        //Node server options
        options = {
        script: config.server,
        env: {
            PORT: port,
            'NODE_ENV': "development",
            //Watching backend files
            watch: [config.server, config.gulpfile, config.app]
        }
    };

    return nodemon(options)
        .on('start', () => {
            if(!started){
                cb();
                started = true;
            }
            log("***STARTING NODE SERVER + " + new Date() + "***");
        })
        .on('restart', (files) => {
            log("*** RESTARTING NODE SERVER ON FILES CHANGES: " + files + " ***");
            //Also reload browsers on node server restart
            browserSync.reload({stream: false});
        })
        .on('crash', () => {
            logError("***NODE SERVER IS CRASHED***");
        })
        .on('exit', () => {
            logError("***FINISHING NODE SERVER ***");
        })
});


//<===== BROWSER SYNCHRONIZATION. RELOADING BROWSER =====>
gulp.task("browser-sync", ['nodemon'], () => {

    browserSync.init(null, {
        // Tells BrowserSync on where the express app is running
        proxy: "http://localhost:" + port,

        // All of the following files will be watched - front end files
        files: [config.client + config.all],

        // This port should be different from the express app port
        port: 7000
    });

    log("*** BROWSER SYNC IS WORKING ***");
});

//<===== CONCATENATING ANGULAR AND COMPILING TO ES5 =====>
gulp.task('concat-angular', () => {

    //Cleaning the main app.js file before concatenation
    del.sync(['public/app/app.js']);

    return gulp.src(config.angular)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(ngAnnotate())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(config.client + config.app))
});

//<===== DEFAULT TASK =====>
gulp.task('default', ['browser-sync'], () => {});
