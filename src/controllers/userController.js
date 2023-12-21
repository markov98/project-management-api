const router = require("express").Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        await userService.register(username, email, password);
        res.send('Registration Successful!')
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;