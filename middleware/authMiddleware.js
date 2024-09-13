const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract the token

    if (token) {
        jwt.verify(token, 'masai', (err, decoded) => {
            if (err) {
                // Handle token verification errors
                return res.status(401).json({
                    message: "Invalid token, please log in again",
                    error: err.message
                });
            }

            // Attach user info to the request object
            req.body.userId = decoded.userId;  // Assuming 'userId' is in the token payload
            req.body.user = decoded.user;  // Assuming 'user' is the username in the token payload
            next();
        });
    } else {
        res.status(401).json({
            message: "Token not found, please log in first"
        });
    }
};

module.exports = authMiddleware;
