const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the request headers
    const token = req.header('Authorization').replace('Bearer ', '');

    // If no token is found
    if (!token) {
      return res.status(401).send({ error: 'Please authenticate.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user information to the request
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If token is invalid or expired
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;