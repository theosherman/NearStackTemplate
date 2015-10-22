'use strict';

angular.module('app').controller('NavbarCtrl', function($scope, $auth) {
	$scope.isAdmin = function() {
		return $auth.isAuthenticated() && $auth.getPayload().role === 'admin';
	}
	
	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	}
	
	$scope.getName = function() {
		return $auth.getPayload().name;
	}
});