'use strict';

angular.module('app').service('AdminService', function(Restangular) {
	this.getUsers = function getUsers() {
		return Restangular.all('users').getList();
	};
});