import { NextFunction, Request, Response } from "express";
import GenericError from "../../../customError";
import successFunction from "../../../customSuccess";
import BorrowModel from "../../models/borrow.model";

async function getSummary(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const aggregate = await BorrowModel.aggregate([
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      { $unwind: "$book" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$book.title",
            isbn: "$book.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    const result = successFunction(
      true,
      "Borrowed books summary retrieved successfully",
      aggregate
    );
    res.status(200).json(result);
  } catch (error) {
    next(
      new GenericError("No Borrowed books", 400, "BorrowCollectionError", error)
    );
  }
}

export default getSummary;
