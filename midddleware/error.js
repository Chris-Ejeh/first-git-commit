const winston = require('winston');

module.exports = function (err, req, res, next) {
	winston.error(err.message, err);
	// const logger = winston.createLogger({
	// 	transports: [
	// 		new winston.transports.File({ filename: 'filelog.log' }),
	// 		new winston.transports.MongoDB({
	// 			db: 'mongodb://localhost/vidly',
	// 			level: 'info',
	// 		}),
	// 	],
	// });
	// logger.error(err.message);

	//error, warn, info, verbrose, debug, silly
	res.status(500).send('Something failed. ');
};
