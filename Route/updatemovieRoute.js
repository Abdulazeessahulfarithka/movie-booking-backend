import express from "express";
import { recommendMovie, getMovies, getMovieById } from "../Controller/updatemovieController.js";

const router = express.Router();

// Add movie (POST)
router.post('/add', recommendMovie);

// Get all movies (GET)
router.get('/all', getMovies);
router.get('/:id', getMovieById);

export default router;
