const router = require("express").Router();
const userController = require('./controllers/userController');
const rolesController = require('./controllers/rolesController');

router.get('/', (req, res) => {
    res.send('Hello! This is Project Management API!')
})

router.use('/users', userController);
router.use('/roles', rolesController);

module.exports = router;