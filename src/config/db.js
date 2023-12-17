const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('src/db/project.db', (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        console.log('Connected to database.');
    }
});