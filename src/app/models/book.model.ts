import mongoose, { Schema } from "mongoose";
import { Book, BookModelType } from "./interfaces";
import GenericError from "../../customError";

const bookSchema = new Schema<Book>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    copies: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.static(
  "borrowCopy",
  async function (bookId: Schema.Types.ObjectId, quantity: number) {
    if (quantity <= 0) {
      throw new GenericError(
        "Quantity must be a positive number",
        400,
        "ValidationError"
      );
    }
    const updated = await this.findOneAndUpdate(
      { _id: bookId, copies: { $gte: quantity } },
      { $inc: { copies: -quantity } },
      { new: true }
    );

    if (!updated) {
      throw new GenericError(
        "Not enough copies available",
        400,
        "ValidationError"
      );
    }

    return updated;
  }
);

bookSchema.static(
  "checkAvailability",
  async function (bookId: Schema.Types.ObjectId) {
    const book = await this.findOne({ _id: bookId });
    if (!book) {
      throw new GenericError("Book not found", 404, "BookNotFound");
    }
    const newAvailability = book.copies > 0;
    if (book.available !== newAvailability) {
      book.available = newAvailability;
      await book.save();
    }

    return book;
  }
);

const BookModel = mongoose.model<Book, BookModelType>("Book", bookSchema);
export default BookModel;
