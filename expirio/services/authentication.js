secretKey = process.env.JWT_SECRET

//Verify Token
function verifyToken(req, res, next) {
	// get auth header value
    const bearerHeader = req.headers['authorization'];
	// check if bearer undefined
	if(typeof bearerHeader !== 'undefined'){
		// split at the space
		const bearer = bearerHeader.split(' ');
		// Get token from array
		const bearerToken = bearer[1];
		//Set the token
		req.token = bearerToken;
		//Next middleware
		next()
	} else {
		// Forbidden
		res.status(403).json({error: "forbidden"});
	}
}

module.exports = {secretKey, verifyToken}