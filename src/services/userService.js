const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../config/db');

exports.register = (username, email, password) => {
    db.run(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
`, [username, email, password]);
};