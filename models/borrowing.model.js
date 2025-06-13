import mongoose from "mongoose";

const borrowingSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    borrowDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Borrowing = mongoose.model("Borrowing", borrowingSchema);

export default Borrowing;
