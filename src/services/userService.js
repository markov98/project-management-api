const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../config/db');

exports.register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)
`, [username, email, hashedPassword]);
};