'use strict';

var app = require('express')();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var utility = require('../../utility');
var User = require('../../schema/user');

app.post('/login', function(req, res) {
	User.filter({email: req.body.email}).run().then(function(users) {
		if (users.length == 1) {
			var user = users[0];
			bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
				if (err) {
					utility.handleErrorResponse(res, err);
				} else if (isMatch) {
					var token = jwt.sign({ id: user.id, name: user.name, role: user.role }, 'secret', { expiresIn: "7 days"});
					res.send({ token: token });
				} else {
					utility.denyAccess(res);
				}
			});
		}
		else
			utility.denyAccess(res);
	}).error(function(err) {
		utility.handleErrorResponse(res, err);
	});
});

module.exports = app;