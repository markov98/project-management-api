const sqlite3 = require('sqlite3').verbose();
const { DBPATH } = require('../constants');


const db = new sqlite3.Database(DBPATH, (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to database.');
    }
});

process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});

module.exports = db;