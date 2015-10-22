angular.module('app').controller('ProfileCtrl', function($scope, $auth) {
  $scope.profile = $auth.getPayload();
});