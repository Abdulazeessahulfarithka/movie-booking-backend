import Update from "../Model/updatedModel.js"; // Your movie model

// Add Movie
export const recommendMovie = async (req, res) => {
  try {
    const { moviename, image, aboutmovie, cast, crew, ratings } = req.body;

    const recommendMovie = new Update({
      moviename,
      image,
      aboutmovie,
      cast,
      crew,
      ratings,
    });

    await recommendMovie.save();

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      movie: recommendMovie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding movie",
      error: error.message,
    });
  }
};

// Get All Movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Update.find();

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
    res.status(500).json({
      success: false,
      message: "Error fetching movies",
      error: error.message,
    });
  }
};

// Get Movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Update.findById(req.params.id);

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
    res.status(500).json({
      success: false,
      message: "Failed to fetch movie details",
      error: error.message,
    });
  }
};
