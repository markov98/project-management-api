const router = require("express").Router();
const rolesService = require('../services/rolesService');

router.post('/add', async (req, res) => {
    try {
        const { roleName, description } = req.body
        await rolesService.add(roleName, description);
        res.send('Role added');
    } catch (err) {
        res.status(404).json(err.message)
    }
})

module.exports = router;