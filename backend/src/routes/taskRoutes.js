const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createTask, getTasks, getTaskById } = require('../controllers/taskController');

const router = express.Router();

router.use(protect);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);

module.exports = router;