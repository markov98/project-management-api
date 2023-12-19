const router = require("express").Router();
const userController = require('./controllers/userController');

router.get('/', (req, res) => {
    res.send('Hello! This is Project Management API!')
})

router.use('/users', userController);

module.exports = router;