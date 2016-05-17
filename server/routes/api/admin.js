'use strict';

var app = require('express')();
var bcrypt = require('bcryptjs');

var utility = require('../../utility')
var User = require('../../schema/user');

app.use((req, res, next) => {
	if (req.user.role !== 'admin')
		utility.denyPermission(res);
	else
		next();
});

app.get('/users', (req, res) => {
	User.getView().run().then((users) => {
		res.send(users);
	}).error((err) => {
		utility.handleErrorResponse(res, err);
	});
});

app.post('/users', (req, res) => {
	var user = new User(req.body);
	
	bcrypt.hash(user.password, 3, (err, hash) => {
		user.password = hash;
		user.save().then(() => {
			res.send(user);
		}).error((err) => {
			utility.handleErrorResponse(res, err);
		});
	});
});

module.exports = app;