const { PORT, DBPATH } = require('./constants');

// Setting up express app
const app = require('./config/express')();

// Connecting to DB
const db = require('./config/db')(DBPATH);

app.listen(PORT, () => console.log(`Server is listenting on port ${PORT}...`));