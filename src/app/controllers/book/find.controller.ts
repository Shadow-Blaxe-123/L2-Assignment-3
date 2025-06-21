import { NextFunction, Request, Response } from "express";
import GenericError from "../../../customError";
import customSuccess from "../../../customSuccess";
import BookModel from "../../models/book.model";
import { SortOrder } from "mongoose";

async function findBookByID(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { filter, sortBy, sort, limit } = req.query;
    // checking the queries are the correct ones; otherwise giving default values.
    const filterQuery = filter ? { genre: filter } : {};
    const sortQuery: Record<string, SortOrder> = sortBy
      ? {
          [sortBy as string]: sort === "asc" ? 1 : -1,
        }
      : {};
    const limitQuery = limit ? Number(limit) : 0;
    const foundBooks = await BookModel.find(filterQuery)
      .sort(sortQuery)
      .limit(limitQuery);
    const result = customSuccess(true, "Books found successfully", foundBooks);
    res.status(200).json(result);
  } catch (error) {
    next(new GenericError("Unknown Query Error", 400, "QueryError", error));
  }
}

export default findBookByID;
