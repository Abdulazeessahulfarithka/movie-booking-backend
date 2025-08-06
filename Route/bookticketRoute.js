import express from "express";
import { 
  bookTicket, 
  getBookings, 
  getBookingById 
} from "../Controller/bookticketController.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// Book a ticket (protected - only logged in users)
router.post("/book", authMiddleware, bookTicket);

// Get all bookings (protected - ideally admin only)
router.get("/", authMiddleware, getBookings);

// Get booking by ID (protected - only logged in users can view their booking)
router.get("/:id", authMiddleware, getBookingById);

export default router;
