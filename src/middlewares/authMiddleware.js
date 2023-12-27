const jwt = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.auth = (req, res, next) => {
  const token = req.header("X-Authorization");

  if (token) {
    try {
      const decodedToken = jwt.verify(token, SECRET);
      req.user = decodedToken;

      next();
    } catch (error) {
      res.status(401).json({ message: "You are not authorized!" });
    }
  } else {
    next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ message: "You are not authorized!" });
  } else {
      next()
  }
}