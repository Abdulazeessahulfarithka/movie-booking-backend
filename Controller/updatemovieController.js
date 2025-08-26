import Update from "../Model/updatedModel.js";

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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding movie",
      error: error.message,
    });
  }
};

// Get Movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Update.find(); // <-- FIXED: Using Update

    if (!movies || movies.length === 0) {
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
