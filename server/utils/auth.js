import jwt from "jsonwebtoken";

/**
 * JWT Signature Verification.
 * @global
 */

// module.exports = {
export default (req, res, next) => {
	const authorizationHeaader = req.headers.authorization;
	let result;
	if (authorizationHeaader) {
		const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
		console.log('>>> TOKEN = ' + token);
		const options = {
			expiresIn: '3600',
			// issuer: 'svbp'
		};
		try {
			// verify makes sure that the token hasn't expired and has been issued by us
			result = jwt.verify(token, 'svbp', options);

			// Let's pass back the decoded token to the request object
			req.decoded = result;
			// We call next to pass execution to the subsequent middleware
			next();
		} catch (err) {
			console.log('ERROR from auth.js:', err);
			// Throw an error just in case anything goes wrong with verification
			throw new Error(err);
		}
	} else {
		result = {
			error: `Authentication error. Token required.`,
			status: 401
		};
		res.status(401).send(result);
	}
}
// };
