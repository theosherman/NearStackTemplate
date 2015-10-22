'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

config.express = {
	port: 3000
};

config.rethinkdb = {
	host: 'localhost',
	port: '28015',
	db: 'NearStackTemplate' + (config.environment === 'development' ? 'Dev' : 'Prd')
};

module.exports = config;