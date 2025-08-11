
const express = require('express');
const { getElection, addElection, updateElection, deleteElection } = require('../controllers/electionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getElection).post(protect, addElection);
router.route('/:id').put(protect, updateElection).delete(protect, deleteElection);

module.exports = router;
