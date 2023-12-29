const router = require("express").Router();
const rolesService = require('../services/rolesService');
const { isAuth } = require("../middlewares/authMiddleware");

router.post('/add', isAuth, async (req, res) => {
    try {
        const { roleName, description } = req.body
        await rolesService.add(roleName, description);
        res.send('Role added');
    } catch (err) {
        res.status(404).json(err.message)
    }
})

module.exports = router;