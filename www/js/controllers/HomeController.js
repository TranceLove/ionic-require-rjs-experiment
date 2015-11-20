define(["controllers/module"], function (controllers) {
	"use strict";
	controllers.controller('HomeController',["$scope", function ($scope) {
		$scope.device = window.device.model
		$scope.currentTime = new Date()
	}]);
});
