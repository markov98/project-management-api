const router = require("express").Router();
const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const result = await userService.register(username, email, password);
        res.json(result)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/register', async (req, res) => {

})


module.exports = router;