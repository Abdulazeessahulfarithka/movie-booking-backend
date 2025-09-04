import mongoose from "mongoose";

const bookTicketSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    seats: { type: [String], required: true }, // Array of seat labels
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    totalPrice: { type: Number, required: true }
  },
  { timestamps: true } // <-- correctly placed here
);

export default mongoose.model("Book", bookTicketSchema);
