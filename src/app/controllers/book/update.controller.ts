import { NextFunction, Request, Response } from "express";
import GenericError from "../../../customError";
import customSuccess from "../../../customSuccess";
import BookModel from "../../models/book.model";
import mongoose from "mongoose";

export function setAvailability(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { copies } = req.body;

  if (typeof copies === "number") {
    req.body.available = copies > 0;
  }

  next(); // pass control to the next middleware
}

async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { bookId } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return next(new GenericError("Invalid Book ID format", 400, "BookIdError"));
  }

  try {
    const book = await BookModel.findByIdAndUpdate(bookId, req.body, {
      new: true, // return updated doc
      runValidators: true, // enforce schema validation
    });

    if (!book) {
      return next(new GenericError("Book not found", 404, "BookNotFound"));
    }

    const result = customSuccess(true, "Book updated successfully", book);
    res.status(200).json(result);
  } catch (error) {
    next(new GenericError("Update failed", 500, "UpdateError", error));
  }
}

export default updateBook;
