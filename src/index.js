const express = require('express');

// Connecting to DB
const db = require('./config/db');

const app = express();
const PORT = 3030;


app.listen(PORT, () => console.log(`Server is listenting on port ${PORT}...`));