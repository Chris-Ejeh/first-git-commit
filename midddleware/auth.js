const jwt = require('jsonwebtoken');
const config = require('config');

//next is used to pass control to the next middleware function in the request ////processing pipeline
module.exports = function auth(req, res, next) {
	const token = req.header('app-auth-token');
	if (!token) return res.status(401).send('Access denied. No token provided. ');
	//this helps the client to figure out why they cannot access this resourse

	try {
		//if there is a token we need to verify that this is a valid token
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		req.user = decoded;
		//req.user._id
		next();
	} catch (ex) {
		res.status(400).send('Invalid token');
	}
};
