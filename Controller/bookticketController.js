import braintree from "braintree";
import Book from "../Model/bookticketModel.js";
import Movie from "../Model/movieModel.js";
import { response } from "express";


//payment gateway
const gateway =new braintree.BraintreeGateway({
   environment: braintree.Environment.Sandbox,
  merchantId: 'your_merchant_id',
  publicKey: 'your_public_key',
  privateKey: 'your_private_key',
})
// Book a ticket
export const bookTicket = async (req, res) => {
  try {
    const { time, seats, movieId } = req.body;

    // Validation
    if (!time || !seats) {
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
    const booking = new Book({ time,seats });
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

//payment gateway api
export const braintreeTokenController =async (req,res)=>{
  try{
   await gateway.clientToken.generate({}, function(err,message){
    if (err){
      res.status(500).send(err)
    } else{
      res.send(response)
    }
   })
  }catch(error){
    console.log(error)
  }
}

//payment
 export const brainTreePaymentController = async  (req,res) =>{
  try{
    const {nonce,cart}=req.body
    let total=0;
    cart.map((i)=>{
      total += i.price
    })
    let newTransaction=gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true,
      }

  },
    function (err,result){
      if(result){
        const order =new orderModel({
          products:cart,
          payment:result,
          buyer:req.user_id,
        }).save()
      } else{
        res.status(500).send(error)
      }
    }
    )

  }catch(error){
    console.group(error)
  }

 }