const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require('util');

const db = require('../config/db');

const dbRunAsync = util.promisify(db.run).bind(db);
const dbGetAsync = util.promisify(db.get).bind(db);

exports.register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    await dbRunAsync(`
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `, [username, email, hashedPassword]);

    const user = { id: this.lastID, email };
    return getResult(user);

};

exports.login = async (email, password) => {
    const user = await dbGetAsync('SELECT id, email, username, password FROM users WHERE email = ?', [email]);

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
    const payload = { _id: user._id, email: user.email };
    const token = jwt.sign(payload, "SOME_SECRET", { expiresIn: "1d" });
    const result = {
        _id: user._id,
        accessToken: token,
        email: user.email,
    };

    return result;
}