import { NextFunction, Request, Response } from "express";
import GenericError from "../../../customError";
import customSuccess from "../../../customSuccess";
import BookModel from "../../models/book.model";

async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Making the new book entry.
    const newBook = await BookModel.create(req.body);
    // checking the created book for response.
    const checkBook = await BookModel.findById(newBook._id);
    // Making the response.
    const result = customSuccess(true, "Book created successfully", checkBook);
    res.status(201).json(result);
  } catch (error: unknown) {
    // Error handling.
    next(new GenericError("Validation failed", 400, "ValidatorError", error));
  }
}

export default createBook;
