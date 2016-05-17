var bcrypt = require('bcryptjs');
var config = require('../config');
var thinky = require('thinky')(config.rethinkdb);
var type = thinky.type;
var r = thinky.r;

var User = thinky.createModel("User", {
    id: type.string(),
    name: type.string().required(),
	email: type.string().required().email(),
    password: type.string(),
    role: type.string().default('user'),
	createdAt: type.date().default(r.now())
});

User.ensureIndex('email');

User.post('save', () => {
    delete this.password;
});

User.defineStatic("getView", () => {
    return this.without('password');
});

module.exports = User;