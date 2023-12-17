const express = require('express');

// Connecting to DB
const db = require('./config/db');

const app = express();
const PORT = 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(PORT, () => console.log(`Server is listenting on port ${PORT}...`));