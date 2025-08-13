
const express = require('express');
const { getCandidate, addCandidate, updateCandidate, deleteCandidate } = require('../controllers/candidateController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getCandidate).post(protect, addCandidate);
router.route('/:id').put(protect, updateCandidate).delete(protect,deleteCandidate);

module.exports = router;
