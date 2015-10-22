'use strict';

angular.module('app').controller('HomeCtrl', function ($scope, $auth, ngToast) {
  $scope.getName = function() {
    return $auth.getPayload().name;
  };
  
  $scope.pop = function() {
    ngToast.info({content:"'Allo, " + $auth.getPayload().name});
  };
});
