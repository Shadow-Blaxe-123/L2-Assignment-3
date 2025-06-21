import { NextFunction, Request, Response } from "express";
import GenericError from "../../../customError";
import customSuccess from "../../../customSuccess";
import BookModel from "../../models/book.model";

async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    await BookModel.findByIdAndDelete(req.params.bookId);
    const result = customSuccess(true, "Book deleted successfully", null);
    res.status(200).json(result);
  } catch (error) {
    next(new GenericError("Delete failed", 500, "DeleteError", error));
  }
}

export default deleteBook;
