import express from "express";
import { recommendMovie, getMovies } from "../Controller/updatemovieController.js";

const router = express.Router();

// Add movie (POST)
router.post('/add', recommendMovie);

// Get all movies (GET)
router.get('/all', getMovies);

export default router;
