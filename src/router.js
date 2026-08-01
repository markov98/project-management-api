const router = require("express").Router();
const userController = require('./controllers/userController');
const rolesController = require('./controllers/rolesController');
const teamsController = require('./controllers/teamsController');

router.get('/', (req, res) => {
    res.send('Hello! This is Project Management API!')
})

router.use('/users', userController);
router.use('/roles', rolesController);
router.use('/teams', teamsController);

module.exports = router;