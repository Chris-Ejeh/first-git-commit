const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
	winston.handleExceptions(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: 'uncaughtExceptions.log' }),
	);

	process.on('unhandledRejection', (ex) => {
		throw ex;
	});

	winston.rejections.handle(
		new winston.transports.Console({ colorize: true, prettyPrint: true }),
		new winston.transports.File({ filename: 'rejections.log' }),
	);

	winston.add(winston.transports.File, { filename: 'filelog.log' });
	// (transport: winston.transport) => winston.Logger
	winston.add(winston.transports.MongoDB, {
		db: 'mongodb://localhost/vidly',
		level: 'info',
	});
};
