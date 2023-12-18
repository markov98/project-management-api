const express = require('express');
const cors = require("cors");

// Connecting to DB
const db = require('./config/db');

const app = express();
const PORT = 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server is listenting on port ${PORT}...`));