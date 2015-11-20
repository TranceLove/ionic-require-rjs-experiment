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

There are gulp and grunt tasks that can call r.js to perform the optimisation, but either they are not easy to setup, or they
simply cannot fit into my situation which didn't considered optimising Javascript at all from the beginning.

Therefore, an `after_prepare` hook is added into the build process, which calls r.js directly to perform the optimisation, before
`cordova` actually builds the app.

### Gotcha on running Javascript optimisers with apps written in AngularJS+RequireJS

Explicit dependency declaration is required, since r.js(or other Javascript optimisers too) may also optimise variable names,
which can also become a problem.

See https://docs.angularjs.org/guide/di for details.
