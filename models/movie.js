const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

//Representation of our modal in the application
//what we're going to store in mongodb
const Movie = mongoose.model(
	'Movie',
	new mongoose.Schema({
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 255,
		},
		genre: {
			type: genreSchema,
			required: true,
		},
		numberInStock: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
		dailyRentalRate: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
	}),
);

//input to our API, what the client sends us
function validateMovie(movie) {
	const schema = Joi.object({
		title: Joi.string().min(3).required(),
		genreId: Joi.ObjectId().required(),
		numberInStock: Joi.number().min(0).required(),
		dailyRentalRate: Joi.number().min(0).required(),
	});
	return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
