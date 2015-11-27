# ionic-require-rjs-experiment

Little experiment on doing an ionic app with RequireJS and r.js optimiser

This started off as an experiment on optimizing an app written with Ionic Framework (http://www.ionicframework.com)
with RequireJS (http://www.requirejs.org) for modularity, and r.js (https://github.com/jrburke/r.js) as Javascript optimiser.

Feel free to make this your starting point of making good modularised Ionic/Cordova application without sacrificing script file size
and script obfuscity concerns.

### Adding RequireJS into an Ionic Project

The idea came from https://www.startersquad.com/blog/angularjs-requirejs/. With everything becomes modular,
multiple developers can work on the same project without disturbing each other's work. It also allows easier testing on
individual controllers/services/directives.

### Using r.js as Javascript optimiser

There are `gulp` and `grunt` tasks that can call `r.js` to perform the optimisation, but either they are not easy to setup, or they
simply cannot fit into my situation which didn't considered optimising Javascript at all from the beginning.

Therefore, an `after_prepare` hook is added into the build process, which calls r.js directly to perform the optimisation, before
`cordova` actually builds the app.

During environment however, it is a good idea to keep the JS files unmodified or minified. So a `r.js` flag is introduced in `bower.json` which will, when set to true, calls `r.js` for optimising the JS files.

### Caveat on running Javascript optimisers with apps written in AngularJS+RequireJS

Explicit dependency declaration is required, since r.js(or other Javascript optimisers too) may also optimise variable names,
which can also become a problem.

See https://docs.angularjs.org/guide/di for details.

### Enable template cache to add HTML view templates into minified JS file

AngularJS allow view templates declared as strings in its own template cache, which can speed up view loading and make HTML source modification more difficult.

However, it also increase difficulty during development. Therefore, a little trick is used to enable usage of template cache automatically.

First, a `gulp-angular-templatecache` flag is defined in bower.json. When enabled, a gulp task is called to compile separate HTML view templates into one JS file.

Then in `app.js`, there are two special tokens, `/*,'templates'*/` and `/*,'myapp.templates'*/`. When `gulp-angular-templatecache` is enabled in bower.json, a Cordova hook will modify `app.js` by uncomment out these two tokens, before everything goes to `r.js` hook for processing.

Together with the `r.js` optimisation above, the whole AngularJS/Ionic Framework HTML and JS assets can be concatenated and minified into one single file. :)
