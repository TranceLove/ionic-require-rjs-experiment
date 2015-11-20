define(["angular",
        "angular-ionic",
        "angular-cookies",
        "angular-ui-router",
        "controllers/index"], function(angular){
	return angular.module('app', ['ionic', 'ui.router', 'myapp.controllers'])
    .config(["$compileProvider", function ($compileProvider){
        // Set the whitelist for certain URLs just to be safe
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|content):/);
    }])
	.run(["$ionicPlatform", "$http", "$rootScope", "$state", function($ionicPlatform, $http, $rootScope, $state) {
        $ionicPlatform.ready(function() {
            console.log("Bootstrapping application")
			//Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if(window.cordova && window.cordova.plugins.Keyboard)
            {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.StatusBar)
            {
				StatusBar.styleDefault();
			}
		});
	}]);
});
