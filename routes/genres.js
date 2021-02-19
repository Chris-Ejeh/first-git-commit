const auth = require('../midddleware/auth');
const admin = require('../midddleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	throw new Error('Could not get the genres. ');
	const genres = await Genre.find().sort('name');
	res.send(genres);
});

//first arg. = route, second arg. = optionally middleware, third arg. = route ////handler
router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = new Genre({ name: req.body.name });
	//let makes genre a variable, so we can reset genre
	await genre.save();
	res.send(genre);
});

router.put('/:id', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true },
	);
	//new: true => get updated object from db
	if (!genre)
		return res.status(404).send('The course with the given ID was not found');

	res.send(genre);
});

//middleware function [auth & admin] will be executed in sequence starting with auth, if the client send a valid json webtoken, then we get to admin. If the user is an admin, then, the route handler will be executed.
router.delete('/:id', [auth, admin], async (req, res) => {
	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre)
		return res.status(404).send('The course with the given ID was not found');

	res.send(genre);
});

router.get('/:id', async (req, res) => {
	const genre = await Genre.findById(req.params.id);

	if (!genre)
		return res.status(404).send('The course with the given ID was not found');

	res.send(genre);
});

module.exports = router;
