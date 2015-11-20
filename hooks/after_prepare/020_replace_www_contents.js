#!/usr/bin/env node

"use strict"

const fs = require("fs")
const path = require("path")
const childProcess = require("child_process")

const ANDROID_ASSETS_DIR = "platforms/android/assets/www"

let args = process.env["CORDOVA_CMDLINE"].split(" ")
// if(args.indexOf("--release") > 0)
// {
//     console.log(`RELEASE BUILD - PERFORMING SCRIPT UGLIFICATION`)
    childProcess.execSync("bash r.js.sh", {
        cwd: `${__dirname}/../..`
    })
// }

//fs.unlinkSync(`${__dirname}/../../${ANDROID_ASSETS_DIR}/js/app.js`);
