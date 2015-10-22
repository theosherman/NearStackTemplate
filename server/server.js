'use strict';

var app = require('express')();
var morgan = require('morgan');
var jwt = require('express-jwt');
var bodyParser = require('body-parser');
var cors = require('cors');

var config = require('./config');

app.use(morgan('combined'));
app.use(cors());
app.use(jwt({ secret: 'secret' }).unless({ path: ['/api/auth/login']}));
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError')
		res.status(err.status).send({message: err.message});
});
app.use(bodyParser.json());
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));

app.listen(config.express.port);