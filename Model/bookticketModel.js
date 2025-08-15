import mongoose from "mongoose";

const bookTicketSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie", // reference to Movie model
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Book", bookTicketSchema);
