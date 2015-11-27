{
    "name": "main",
    "baseUrl": "www/js",
    "paths": {
        "angular": "../lib/ionic/js/angular/angular",
		"angular-animate": "../lib/ionic/js/angular/angular-animate",
		"angular-touch": "../lib/ionic/js/angular/angular-touch",
		"angular-sanitize": "../lib/ionic/js/angular/angular-sanitize",
		"angular-ui-router": "../lib/ionic/js/angular-ui/angular-ui-router",
		"angular-cookies":"../lib/ionic/js/angular/angular-cookies",
		"ionic": "../lib/ionic/js/ionic",
		"angular-ionic": "../lib/ionic/js/ionic-angular"
    },
    "shim": {
		"angular": {"exports": "angular"},
		"angular-ui-router": {"deps": ["angular"]},
		"angular-animate": {"deps": ["angular"]},
		"angular-touch": {"deps": ["angular"]},
		"angular-sanitize": {"deps": ["angular"]},
		"angular-cookies": {"deps": ["angular"]},
		"ionic" : {"exports" : "ionic"},
		"angular-ionic": { "deps":["angular", "ionic", "angular-ui-router", "angular-animate", "angular-touch", "angular-sanitize", "angular-cookies"] }
	},
    "out": "main.built.js",
    "wrapShim": true
}
