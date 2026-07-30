const router = require("express").Router();
const userService = require('../services/userService');
const { isAuth, revokeToken } = require('../middlewares/authMiddleware');

router.get('/assigned-users', async (req, res) => {
    try {
        res.json(await userService.getAssignedUsers());
    } catch (err) {
        console.error(err);
        const status = err.status || 500;
        res.status(status).json({ error: err.message || 'Internal Server Error' });
    }
});


router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await userService.register(username, email, password);
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        const status = err.status || 500;
        res.status(status).json({ error: err.message || 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.json(result);
    } catch (err) {
        console.error(err);
        const status = err.status || 500;
        res.status(status).json({ error: err.message || 'Internal Server Error' });
    }
});

router.get("/logout", isAuth, (req, res) => {
    revokeToken(req.token);
    res.send("Logout successful!")
});

module.exports = router;