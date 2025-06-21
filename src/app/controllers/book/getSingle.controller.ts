import { NextFunction, Request, Response } from "express";
import GenericError from "../../../customError";
import customSuccess from "../../../customSuccess";
import BookModel from "../../models/book.model";

async function getSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const book = await BookModel.findById(req.params.bookId);
    const result = customSuccess(true, "Book retrieved successfully", book);
    res.status(200).json(result);
  } catch (error) {
    next(new GenericError("Invalid BookId", 400, "BookIdError", error));
  }
}
export default getSingleBook;
