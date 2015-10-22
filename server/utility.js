'use strict';

var utility = {};

utility.handleErrorResponse = function sendServerError(res, err) {
	if (err)
		console.log(err);
	res.status(500).send({message: 'Server error'});
}

utility.denyPermission = function denyPermission(res) {
	res.status(403).send({message: 'Permission denied'});	
};

utility.denyAccess = function denyAccess(res) {
	res.status(401).send({message: 'Invalid credentials'});
}

module.exports = utility;