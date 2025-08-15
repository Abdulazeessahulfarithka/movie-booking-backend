import express from "express";
import { recommendMovie } from "../Controller/updatemovieController.js";

const router =express.Router()

router.post('/update',recommendMovie)


export default router