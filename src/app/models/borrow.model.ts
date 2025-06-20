import { Schema, model } from "mongoose";
import { Borrow } from "./interfaces";

const borrowSchema = new Schema<Borrow>({
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
});

const BorrowModel = model<Borrow>("Borrow", borrowSchema);

export default BorrowModel;
