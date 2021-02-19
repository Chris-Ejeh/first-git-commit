const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 1024,
	},
	//Role based Authorization
	//could have roles
	isAdmin: Boolean,
	// roles: [],
	// operations: []
	//Or operations that the users are allowed to perform
	//pass something that determines the level of access of the user in the JWT that u generate as part of authenicating the user. Then you would add a middleware
});

userSchema.methods.generateAuthToken = function () {
	//Before returning the res, create a new JWT
	//how to generate a token
	const token = jwt.sign(
		{ _id: this._id, isAdmin: this.isAdmin },
		config.get('jwtPrivateKey'),
	);
	return token;
};

const User = mongoose.model('User', userSchema);

//Add a method in the Schema

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(5).max(255).required(),
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
