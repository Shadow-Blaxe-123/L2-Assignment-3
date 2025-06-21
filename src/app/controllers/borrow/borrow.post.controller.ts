import { Request, Response, NextFunction } from "express";
import BookModel from "../../models/book.model";
import BorrowModel from "../../models/borrow.model";
import successFunction from "../../../customSuccess";
import GenericError from "../../../customError";

async function createBorrow(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    if (await BookModel.findById(req.body.book)) {
      const newBorrow = await BorrowModel.create(req.body);
      const result = await BorrowModel.findById(newBorrow._id);
      const r = successFunction(true, "Book borrowed successfully", result);
      res.status(200).json(r);
    } else {
      next(new GenericError("The Book doesn't exist", 404, "BookNotFound"));
    }
  } catch (error) {
    next(new GenericError("Validation failed", 400, "ValidatorError", error));
  }
}

export default createBorrow;
