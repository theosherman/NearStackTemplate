'use strict';

var app = require('express')();
var bcrypt = require('bcryptjs');

var utility = require('../../utility')
var User = require('../../schema/user');

app.use(function(req, res, next) {
	if (req.user.role !== 'admin')
		utility.denyPermission(res);
	else
		next();
});

app.get('/users', function(req, res) {
	User.getView().run().then(function(users) {
		res.send(users);
	}).error(function(err) {
		utility.handleErrorResponse(res, err);
	});
});

app.post('/users', function(req, res) {
	var user = new User(req.body);
	
	bcrypt.hash(user.password, 3, function(err, hash) {
		user.password = hash;
		user.save().then(function() {
			res.send(user);
		}).error(function(err) {
			utility.handleErrorResponse(res, err);
		});
	});
});

module.exports = app;