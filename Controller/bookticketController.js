import braintree from "braintree";
import Book from "../Model/bookticketModel.js";
import Movie from "../Model/movieModel.js";

// Payment Gateway Configuration (Sandbox)
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "your_merchant_id",
  publicKey: "your_public_key",
  privateKey: "your_private_key",
});

// Book a ticket
export const bookTicket = async (req, res) => {
  try {
    const { time, seats, movieId } = req.body;

    // Validation
    if (!time || !seats || seats.length === 0 || !movieId) {
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

    // Calculate total price
    const ticketPrice = 200; // Can be dynamic
    const totalPrice = seats.length * ticketPrice;

    // Create booking
    const booking = new Book({
      time,
      seats, // Array of seat labels
      movieId,
      totalPrice,
    });

    await booking.save();

    return res.status(201).send({
      success: true,
      message: "Ticket(s) booked successfully",
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
    const bookings = await Book.find().populate("movieId");

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
    const booking = await Book.findById(req.params.id).populate("movieId");

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

// Generate Braintree Token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.error("Braintree token error:", error);
    res.status(500).send({
      success: false,
      message: "Error generating token",
      error: error.message,
    });
  }
};

// Process Braintree Payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (err, result) {
        if (result) {
          return res.status(200).send({
            success: true,
            message: "Payment processed successfully",
            result,
          });
        } else {
          res.status(500).send({
            success: false,
            message: "Payment processing failed",
            error: err,
          });
        }
      }
    );
  } catch (error) {
    console.error("Braintree payment error:", error);
    res.status(500).send({
      success: false,
      message: "Error processing payment",
      error: error.message,
    });
  }
};
