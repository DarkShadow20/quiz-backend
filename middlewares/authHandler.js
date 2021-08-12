const jwt = require('jsonwebtoken');
const secret = process.env['secret']

const isAuthorized = (req, res, next) => {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, secret);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};

module.exports = { isAuthorized };