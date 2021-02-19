//Autorization
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	//validate the request
	//if not valid return error 400
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	//compare a plain text password with a hashed password
	//body.password - plain text
	//user.password - hashed (+ salt encoding)
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Invalid email or password.');

	//log out user in the client side
	//store token in client, when sending from client to server, use ////Https. Hacker sitting in the middle sniffing traffic cannot read //the request from client to server. The data is encrypted.
	//Don't store token in server, only if you can hash it/encrypt
	const token = user.generateAuthToken();

	res.send(token);
});

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(req);
}

module.exports = router;
