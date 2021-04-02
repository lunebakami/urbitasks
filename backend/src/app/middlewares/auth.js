const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const authConfig = require('../../config/auth');

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  try {
    const decoded = await promisify(jwt.verify)(authHeader, authConfig.secret);

    req.userId = decoded.id;
    req.user = decoded.user;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
}

module.exports = auth;
