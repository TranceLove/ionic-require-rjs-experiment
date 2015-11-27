#!/usr/bin/env node

"use strict"

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const templateCache = require('gulp-angular-templatecache');

const VIEWS_MODULE_NAME = "myapp.templates";
const PROJECT_ROOT = `${__dirname}/../..`
let config = JSON.parse(fs.readFileSync(`${PROJECT_ROOT}/bower.json`))

if(config["gulp-angular-templatecache"] === true)
{
    let html2js = function(viewsPath){
        return new Promise(function(resolve, reject) {
            gulp.src(`${viewsPath}/**/*.html`)
                .pipe(templateCache({
                    root:"views/",
                    moduleSystem:"RequireJS",
                    module:VIEWS_MODULE_NAME,
                    standalone:true,
                    filename:"templates.js",
                }))
                .pipe(gulp.dest(`${viewsPath}/../js`));
                resolve(true)
        });
    };

    let iosPlatformsDir = path.resolve(__dirname, '../../platforms/ios/www/views');
    let androidPlatformsDir = path.resolve(__dirname, '../../platforms/android/assets/www/views');

    if(fs.existsSync(iosPlatformsDir))
        html2js(iosPlatformsDir)
    if(fs.existsSync(androidPlatformsDir))
        html2js(androidPlatformsDir)
}
