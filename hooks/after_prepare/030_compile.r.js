#!/usr/bin/env node

"use strict"

const fs = require("fs-extra")
const path = require("path")
const requirejs = require("requirejs")

const PROJECT_ROOT = `${__dirname}/../..`
const OUTPUT_JS = "main.js"
const REQUIRE_JS = "require.js"

let args = process.env["CORDOVA_CMDLINE"].split(" ")
let config = JSON.parse(fs.readFileSync(`${PROJECT_ROOT}/bower.json`))
if(config["r.js"] === true)
{
    console.log("PERFORMING SCRIPT UGLIFICATION")

    let iosPlatformsDir = path.resolve(__dirname, '../../platforms/ios/www/js');
    let androidPlatformsDir = path.resolve(__dirname, '../../platforms/android/assets/www/js');

    let requireConfig = JSON.parse(fs.readFileSync(`${PROJECT_ROOT}/build.r.js`))

    let task = function(srcDir){
        requireConfig.baseUrl = srcDir;
        return new Promise(function(resolve, reject) {
            requirejs.optimize(requireConfig, function(buildResponse){
                console.log(buildResponse)
                resolve(true)
            })
        });
    }

    let copyCompiledJs = function(toDir){
        fs.createReadStream(`${requireConfig.out}`).pipe(fs.createWriteStream(`${toDir}/${OUTPUT_JS}`));
    }

    let copyIonicAssets = function(toDir){
        fs.removeSync(`${toDir}/../lib`);
        fs.mkdirSync(`${toDir}/../lib`);
        fs.copySync(`${PROJECT_ROOT}/www/lib/ionic/css`, `${toDir}/../lib/ionic/css`)
        fs.copySync(`${PROJECT_ROOT}/www/lib/ionic/fonts`, `${toDir}/../lib/ionic/fonts`)
    }

    let copyRequireJs = function(toDir){
        fs.copySync(`${PROJECT_ROOT}/www/js/${REQUIRE_JS}`, `${toDir}/../js/${REQUIRE_JS}`);
        console.log("File copied")
    }

    if(fs.existsSync(iosPlatformsDir))
    {
        task(iosPlatformsDir).then(function(){
            fs.removeSync(iosPlatformsDir)
            fs.mkdirSync(iosPlatformsDir)
            copyCompiledJs(iosPlatformsDir)
            copyIonicAssets(iosPlatformsDir)
            copyRequireJs(iosPlatformsDir)
        })
    }

    if(fs.existsSync(androidPlatformsDir))
    {
        task(androidPlatformsDir).then(function(){
            fs.removeSync(androidPlatformsDir)
            fs.mkdirSync(androidPlatformsDir)
            copyCompiledJs(androidPlatformsDir)
            copyIonicAssets(androidPlatformsDir)
            copyRequireJs(androidPlatformsDir)
        })
    }
}
