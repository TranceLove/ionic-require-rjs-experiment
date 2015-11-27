#!/usr/bin/env node

"use strict"

const fs = require('fs-extra');
const path = require('path');

const PROJECT_ROOT = `${__dirname}/../..`

let config = JSON.parse(fs.readFileSync(`${PROJECT_ROOT}/bower.json`))

if(config["gulp-angular-templatecache"] === true)
{
    let iosPlatformsDir = path.resolve(__dirname, '../../platforms/ios/www/views');
    let androidPlatformsDir = path.resolve(__dirname, '../../platforms/android/assets/www/views');

    let enableViewTemplateInScript = function(fromDir){
        let APP_JS = `${fromDir}/../js/app.js`
        let srcJS = fs.readFileSync(APP_JS, {encoding:"UTF-8"})
        srcJS = srcJS.replace("/*,'templates'*/", ", 'templates'")
        srcJS = srcJS.replace("/*,'myapp.templates'*/", ", 'myapp.templates'")
        fs.writeFileSync(APP_JS, srcJS, {encoding:"UTF-8"})
    }

    let promises = []
    if(fs.existsSync(iosPlatformsDir))
    {
        promises.push(new Promise(function(resolve, reject) {
            fs.remove(iosPlatformsDir, function(){
                resolve(true)
            })
        }));
        promises.push(new Promise(function(resolve, reject) {
            enableViewTemplateInScript(iosPlatformsDir)
            resolve(true)
        }));
    }

    if(fs.existsSync(androidPlatformsDir))
    {
        promises.push(new Promise(function(resolve, reject) {
            fs.remove(androidPlatformsDir, function(){
                resolve(true)
            })
        }));
        promises.push(new Promise(function(resolve, reject) {
            enableViewTemplateInScript(androidPlatformsDir)
            resolve(true)
        }));
    }

    if(promises.length > 0)
    {
        Promise.all(promises).then(function(){
            return true
        })
    }
}
