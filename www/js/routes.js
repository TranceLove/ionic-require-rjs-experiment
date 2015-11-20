"use strict";

define(["app"], function(app){
	return app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
		//For any unmatched url, redirect to /select-server
		$urlRouterProvider.otherwise("/home");

		$stateProvider.state("Home", {
			url: "/home",
			templateUrl: "views/home.html"
		});

	}]);
});
