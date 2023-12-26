const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../config/db');

exports.register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.asyncGet(`
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
    `, [username, email, hashedPassword]);

    const { lastId } = await db.asyncGet('SELECT last_insert_rowid() as lastId');

    const user = { id: lastId, email };
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
    const token = jwt.sign(payload, "SOME_SECRET", { expiresIn: "1d" });
    const result = {
        _id: user.id,
        accessToken: token,
        email: user.email,
    };

    return result;
}