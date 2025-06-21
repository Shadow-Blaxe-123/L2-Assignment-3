import express, { Request, Response, Router, NextFunction } from "express";
import BookModel from "../models/book.model";
import customSuccess from "../../customSuccess";
import GenericError from "../../customError";
import mongoose, { SortOrder } from "mongoose";
// import { MongooseError } from "mongoose";

const bookRouter: Router = express.Router();

// Create books
bookRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Making the new book entry.
      const newBook = await BookModel.create(req.body);
      // checking the created book for response.
      const checkBook = await BookModel.findById(newBook._id);
      // Making the response.
      const result = customSuccess(
        true,
        "Book created successfully",
        checkBook
      );
      res.status(201).json(result);
    } catch (error: unknown) {
      // Error handling.
      next(new GenericError("Validation failed", 400, "ValidatorError", error));
    }
  }
);
// The find route
bookRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
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
});

// Get a single book using _id.
bookRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const book = await BookModel.findById(req.params.bookId);
      const result = customSuccess(true, "Book retrieved successfully", book);
      res.status(200).json(result);
    } catch (error) {
      next(new GenericError("Invalid BookId", 400, "BookIdError", error));
    }
  }
);

// Update a book
bookRouter.patch(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return next(
        new GenericError("Invalid Book ID format", 400, "BookIdError")
      );
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
);

/**
5. Delete Book
DELETE /api/books/:bookId
 */
bookRouter.delete("/:bookId", (req: Request, res: Response) => {
  res.status(200).send("Book Route delete method");
});

//Error
bookRouter.use((req: Request, res: Response, next: NextFunction) => {
  const error = new GenericError(
    `Not Found: /api/books${req.path}`,
    404,
    "PageNotFoundError"
  );
  //   const error = new Error("Not Found: /api/books${req.path}");
  next(error);
});

export default bookRouter;
