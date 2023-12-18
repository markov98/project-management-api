const sqlite3 = require('sqlite3').verbose();

module.exports = (dbPath) => {
    const db = new sqlite3.Database(dbPath, (err) => {
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

    return db;

    return db;
} 