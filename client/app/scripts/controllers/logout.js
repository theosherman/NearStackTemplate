angular.module('app').controller('LogoutCtrl', function($state, $auth, ngToast) {
	if (!$auth.isAuthenticated())
		return;
	
	$auth.logout().then(function() {
		ngToast.success({content: 'You have been logged out'});
		$state.go('login');
	});
});