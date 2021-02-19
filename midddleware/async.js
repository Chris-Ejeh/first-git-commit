module.exports = function (handler) {
	//call a function that is a route handler
	return async (req, res, next) => {
		try {
			await handler(req, res);
		} catch (ex) {
			next(ex);
		}
	};
};
