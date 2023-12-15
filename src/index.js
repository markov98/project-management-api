const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3030;

let db = new sqlite3.Database('src/db/project.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to DB.');
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});

app.listen(PORT, () => console.log(`Server is listenting on port ${PORT}...`));