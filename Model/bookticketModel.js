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

}, { timestamps: true });

export default mongoose.model("Book", bookTicketSchema);
