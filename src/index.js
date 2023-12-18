const express = require('express');
const cors = require("cors");

const { PORT, DBPATH } = require('./constants');

// Connecting to DB
const db = require('./config/db')(DBPATH);

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server is listenting on port ${PORT}...`));