import express from "express";
import { 
  bookTicket, 
  getBookings, 
  getBookingById,
  braintreeTokenController,
  brainTreePaymentController
} from "../Controller/bookticketController.js";
import { authMiddleware } from "../Middleware/auth.js";

const router = express.Router();

// Book a ticket (protected - only logged in users)
router.post("/book", bookTicket);

// Get all bookings (protected - ideally admin only)
router.get("/",getBookings);

// Get booking by ID (protected - only logged in users can view their booking)
router.get("/:id", authMiddleware, getBookingById);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", authMiddleware, brainTreePaymentController);


export default router;
