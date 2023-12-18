const express = require('express');
const cors = require("cors");
const router = require('../router');

module.exports = () => {
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(router);

    return app;
}