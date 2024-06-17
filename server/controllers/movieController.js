const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
// Get all movies with screens
exports.getMoviesWithScreens = async (req, res) => {
    try {
      const movies = await Movie.find().select('-_id title genre screens');
      res.json(movies);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Get screens for a specific movie
  exports.getMovieScreens = async (req, res) => {
    const { movieId } = req.params;
  
    try {
      const movie = await Movie.findById(movieId).select('-_id screens');
      if (!movie) {
        return res.status(404).json({ msg: 'Movie not found' });
      }
      res.json(movie.screens);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };