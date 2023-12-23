const sqlite3 = require('sqlite3').verbose();
const { DBPATH } = require('../constants');

const initializeDatabase = () => {
    // Database will be created if it does not exist
    const db = new sqlite3.Database(DBPATH, (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            createTables(db);
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

// Tables will be created if they do not exist
const createTables = (db) => {
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Users table created.');
        }
    });
};

let db = initializeDatabase();

module.exports = db;