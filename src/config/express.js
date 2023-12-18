const express = require('express');
const cors = require("cors");

module.exports = () => {
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());

    return app;
}