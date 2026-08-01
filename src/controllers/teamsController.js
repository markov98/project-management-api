const router = require('express').Router();
const teamsService = require('../services/teamsService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    try {
        res.json(await teamsService.getAll());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', isAuth, async (req, res) => {
    try {
        const { name, description } = req.body;
        res.status(201).json(await teamsService.create(name, description));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.json(await teamsService.getById(req.params.id));
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.patch('/:id', isAuth, async (req, res) => {
    try {
        const { name, description } = req.body;
        res.json(await teamsService.update(req.params.id, name, description));
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', isAuth, async (req, res) => {
    try {
        await teamsService.delete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.post('/:id/join', isAuth, async (req, res) => {
    try {
        const members = await teamsService.join(req.params.id, req.user._id);
        res.status(201).json(members);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id/leave', isAuth, async (req, res) => {
    try {
        await teamsService.leave(req.params.id, req.user._id);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
