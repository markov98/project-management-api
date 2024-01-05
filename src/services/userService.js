const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../config/db');
const { SECRET } = require("../constants");

exports.register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { lastID } = await db.asyncRun(`
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `, [username, email, hashedPassword]);

    const user = { id: lastID, email };
    return getResult(user);
};

exports.login = async (email, password) => {
    const user = await db.asyncGet('SELECT id, email, username, password FROM users WHERE email = ?', [email]);

    if (!user) {
        throw new Error('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Incorrect password');
    }

    return getResult(user);
};

function getResult(user) {
    const payload = { _id: user.id, email: user.email };
    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    const result = {
        _id: user.id,
        accessToken: token,
        email: user.email,
    };

    return result;
}