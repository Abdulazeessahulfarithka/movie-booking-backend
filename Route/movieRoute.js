import express from "express";
import { 
  addMovie, 
  getMovies, 
  getMovieById, 
  updateMovie, 
  deleteMovie 
} from "../Controller/movieController.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// Add a movie (protected route - only logged in users, ideally admin)
router.post("/add", authMiddleware, addMovie);

// Get all movies (public)
router.get("/", getMovies);

// Get single movie by ID (public)
router.get("/:id", getMovieById);

// Update a movie (protected route)
router.put("/:id", authMiddleware, updateMovie);

// Delete a movie (protected route)
router.delete("/:id", authMiddleware, deleteMovie);

export default router;
