'use strict';

angular.module('app').controller('LoginCtrl', function($scope, $auth, $state, ngToast) {
  $scope.login = function() {
      $auth.login($scope.user)
        .then(function() {
          ngToast.success({content: 'You have successfully signed in'});
          $state.go('home');
        })
        .catch(function(response) {
          ngToast.pop(response.data.message);
        });
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          ngToast.success({content: 'You have successfully signed in with ' + provider });
          $state.go('home');
        })
        .catch(function(response) {
          ngToast.pop(response.data.message);
        });
    };
});