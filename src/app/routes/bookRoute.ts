import express, { Request, Response, Router } from "express";
import BookModel from "../models/book.model";
import customSuccess from "../../customSuccess";
import GenericError from "../../customError";
import { SortOrder } from "mongoose";
// import { MongooseError } from "mongoose";

const bookRouter: Router = express.Router();

// Create books
bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    // Making the new book entry.
    const newBook = await BookModel.create(req.body);
    // checking the created book for response.
    const checkBook = await BookModel.findById(newBook._id);
    // Making the response.
    const result = customSuccess(true, "Book created successfully", checkBook);
    res.status(201).json(result);
  } catch (error) {
    // Error handling.
    const err: GenericError = new GenericError("Validation failed", 400);
    res.status(err.statusCode).json(err.errormsg(error));
  }
});
// The find route
bookRouter.get("/", async (req: Request, res: Response) => {
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
    const err: GenericError = new GenericError("Unknown Query Error", 400);
    res.status(err.statusCode).json(err.errormsg(error));
  }
});

/*
3. Get Book by ID
GET /api/books/:bookId
*/
bookRouter.get("/:bookId", (req: Request, res: Response) => {
  res.status(200).send("Book Route get by id method");
});

/*
4. Update Book
PUT /api/books/:bookId
*/
bookRouter.put("/:bookId", (req: Request, res: Response) => {
  res.status(201).send("Book Route update method");
});

/**
5. Delete Book
DELETE /api/books/:bookId
 */
bookRouter.delete("/:bookId", (req: Request, res: Response) => {
  res.status(200).send("Book Route delete method");
});

export default bookRouter;
