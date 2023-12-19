const sqlite3 = require('sqlite3').verbose();
const { DBPATH } = require('../constants');

const initializeDatabase = () => {
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
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database connection closed.');
            }
            process.exit(0);
        });
    });

    return db;
};

let db = initializeDatabase();

module.exports = db;