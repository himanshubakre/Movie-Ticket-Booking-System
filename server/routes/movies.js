const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const auth = require('../middleware/auth');

router.get('/', movieController.getMoviesWithScreens);
router.get('/:movieId/screens', movieController.getMovieScreens);

module.exports = router;
