const sqlite3 = require('sqlite3').verbose();
const util = require('util');

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

    db.run(`
    CREATE TABLE roles (
        id INTEGER PRIMARY KEY,
        role_name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Roles table created.');
    }
});
};

// Modified asyncRun to include changes and lastID
const asyncRun = util.promisify((query, params, callback) => {
    db.run(query, params, function (err) {
        if (err) {
            return callback(err, null);
        }

        const result = {
            changes: this.changes,
            lastID: this.lastID
        };

        callback(null, result);
    });
});

const db = initializeDatabase();
db.asyncRun = asyncRun;
db.asyncGet = util.promisify(db.get);
db.asyncAll = util.promisify(db.all);
module.exports = db;



