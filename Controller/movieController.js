import Movie from "../Model/movieModel.js"; // Capitalized M

// Add a new movie
export const addMovie = async (req, res) => {
  try {
    const { moviename, image, aboutmovie, cast, crew, ratings } = req.body;

    // Validation
    if (!moviename) {
      return res.status(400).json({
        success: false,
        message: "Movie name is required",
      });
    }

    const movie = new Movie({
      moviename,
      image,
      aboutmovie,
      cast,
      crew,
      ratings,
    });

    await movie.save();

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie,
    });
  } catch (error) {
    console.error("Add movie error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding movie",
      error: error.message,
    });
  }
};

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    if (!movies.length) {
      return res.status(404).json({
        success: false,
        message: "No movies found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      movies,
    });
  } catch (error) {
    console.error("Get movies error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching movies",
      error: error.message,
    });
  }
};

// Get single movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie fetched successfully",
      movie,
    });
  } catch (error) {
    console.error("Get movie by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching movie",
      error: error.message,
    });
  }
};

// Update movie
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    console.error("Update movie error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating movie",
      error: error.message,
    });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.error("Delete movie error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting movie",
      error: error.message,
    });
  }
};
