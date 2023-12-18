const sqlite3 = require('sqlite3').verbose();

module.exports = (dbPath) => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            return console.error(err.message);
        } else {
            console.log('Connected to database.');
        }
    });

    return db;
} 