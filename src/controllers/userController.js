const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userService = require('../services/userService');
const { SECRET } = require("../constants");
const { isAuth } = require('../middlewares/authMiddleware');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await userService.register(username, email, password);
        res.json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.massage });
    }
});

router.get("/logout", isAuth, (req, res) => {
    if (req.user) {
        const expiredToken = jwt.sign({ exp: 0 }, SECRET);
        res.header("X-Authorization", expiredToken);
    }

    res.status(200).json({ message: "Logout successful" });
});

module.exports = router;