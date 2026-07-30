const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants');

const revokedTokens = [];

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization') || req.header('X-Authorization');
  if (!authHeader) return next();

  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  req.token = token;

  if (revokedTokens.includes(token)) {
    return res.status(401).json({ message: 'Token revoked' });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET);
    req.user = decodedToken;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'You are not authorized!' });
  }
  return next();
};

exports.revokeToken = (token) => {
  if (!token) return;
  revokedTokens.push(token);
};