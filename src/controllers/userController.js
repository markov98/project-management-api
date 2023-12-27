const router = require("express").Router();
const userService = require('../services/userService');

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

router.get("/logout", (req, res) => {
    res.end();
  });

module.exports = router;