import { Schema, model } from "mongoose";
import { BookModelType, Borrow } from "./interfaces";
import BookModel from "./book.model";

const borrowSchema = new Schema<Borrow>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

borrowSchema.post("save", async (doc) => {
  await BookModel.borrowCopy(doc.book, doc.quantity);
  await BookModel.checkAvailability(doc.book);
});

const BorrowModel = model<Borrow, BookModelType>("Borrow", borrowSchema);

export default BorrowModel;
