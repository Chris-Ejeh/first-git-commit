module.exports = function (req, res, next) {
	//auth sets req.user, we can access that in this function
	//Here, we're checking the value of isAdmin boolean property. In a more complex application, we can look at the roles/operations array. Based on that you decided if you deny access (.status) or allow it (next())
	if (!req.user.isAdmin) return res.status(403).send('Access Denied.');

	//next middleware - route
	next();
};
