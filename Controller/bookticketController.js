import Book from "../Model/bookticketModel.js";
import Movie from "../Model/movieModel.js";

// Book a ticket
export const bookTicket = async (req, res) => {
  try {
    const { time, seats, movieId } = req.body;

    // Validation
    if (!time || !seats || !movieId) {
      return res.status(400).send({
        success: false,
        message: "Time, seats, and movieId are required",
      });
    }

    // Check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).send({
        success: false,
        message: "Movie not found",
      });
    }

    // Create booking
    const booking = new Book({ time, seats });
    await booking.save();

    return res.status(201).send({
      success: true,
      message: "Ticket booked successfully",
      booking,
    });

  } catch (error) {
    console.error("Book ticket error:", error);
    res.status(500).send({
      success: false,
      message: "Error booking ticket",
      error: error.message,
    });
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Book.find();

    if (!bookings.length) {
      return res.status(404).send({
        success: false,
        message: "No bookings found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Bookings fetched successfully",
      bookings,
    });

  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Book.findById(req.params.id);

    if (!booking) {
      return res.status(404).send({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Booking fetched successfully",
      booking,
    });

  } catch (error) {
    console.error("Get booking by ID error:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching booking",
      error: error.message,
    });
  }
};
