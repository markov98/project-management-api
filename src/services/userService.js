const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require('../config/db');

exports.register = async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Promise((resolve, reject) => {
        db.run(`
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `, [username, email, hashedPassword], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({id: this.lastID, email});
            }
        });
    });

    return getResult(await user);
};

exports.login = async (email, password) => {
    
}

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