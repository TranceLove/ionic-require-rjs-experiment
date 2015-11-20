#!/bin/sh

ANDROID_ASSETS_DIR="platforms/android/assets/www"
ASSETS_DIR=${ANDROID_ASSETS_DIR}

r.js -o build.r.js
rm -rf ${ASSETS_DIR}/lib/ionic/js
rm -rf ${ASSETS_DIR}/js
mkdir -p ${ASSETS_DIR}/js
cp www/js/require.js ${ASSETS_DIR}/js
mv main.built.js ${ASSETS_DIR}/js/main.js
