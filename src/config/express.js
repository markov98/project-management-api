const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const router = require('../router');
const { auth } = require('../middlewares/authMiddleware');

module.exports = () => {
    const app = express();

    app.use(helmet());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json({ limit: '10kb' }));
    app.use(cors());

    const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
    app.use(limiter);

    app.use(auth);
    app.use(router);

    return app;
};