const sqlite3 = require('sqlite3').verbose();
const util = require('util');

const { DBPATH } = require('../constants');

const initializeDatabase = () => {
    // Database will be created if it does not exist
    const db = new sqlite3.Database(DBPATH, (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            db.run('PRAGMA foreign_keys = ON');
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
        CREATE TABLE IF NOT EXISTS users (
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
    CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY,
        role_name TEXT NOT NULL UNIQUE,
        description TEXT NOT NULL,
        assigned_user INTEGER REFERENCES users(id)
    )
`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Roles table created.');
    }
});

    db.run(`
        CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            description TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Teams table created.');
        }
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS team_members (
            team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            PRIMARY KEY (team_id, user_id)
        )
    `, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Team members table created.');
        }
    });
};

const db = initializeDatabase();

// Provide promise-based helpers bound to the db instance
db.asyncRun = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.run(query, params, function (err) {
            if (err) return reject(err);

            const result = {
                changes: this.changes,
                lastID: this.lastID
            };

            resolve(result);
        });
    });
};

db.asyncGet = util.promisify(db.get.bind(db));
db.asyncAll = util.promisify(db.all.bind(db));

module.exports = db;



